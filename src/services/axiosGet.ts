import axiosInstance from '../axios';
import axios, { AxiosError } from 'axios';

interface IErrorResponse {
  error: { message?: string };
}

export default async function axiosGet(url: string, signal: AbortSignal) {
  try {
    const response = await axiosInstance.get(url, {
      signal,
    });

    const data = response?.data;

    return { data };
  } catch (err: any) {
    const error = err as Error | AxiosError<IErrorResponse>;
    // replace here with your own error handling
    if (axios.isAxiosError(error)) {
      if (error.code === AxiosError.ERR_CANCELED) {
        return { error: 'Request was canceled' };
      }
      return { error: error };
    } else {
      return { error: error };
    }
  }
}
