import axios, { AxiosError, Method } from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../axios';

interface IErrorResponse {
  error: { message?: string };
}

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const controller = new AbortController();
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(url, {
          signal: controller.signal,
        });

        const data = response?.data;

        setData(data);
      } catch (err: any) {
        const error = err as Error | AxiosError<IErrorResponse>;
        // replace here with your own error handling
        if (axios.isAxiosError(error)) {
          if (error.code === AxiosError.ERR_CANCELED) {
            return 'Request was canceled';
          }
          return error?.response?.data?.error?.message;
        } else {
          return error.message;
        }
      }
    };
    fetch().then((r) => r);

    // To fix the race condition, we need to add a cleanup function to ignore stale responses:
    return () => {
      controller.abort();
    };
  }, [url]);

  return data;
}
