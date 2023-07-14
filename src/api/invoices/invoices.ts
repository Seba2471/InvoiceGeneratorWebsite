import { InvoicesResponse } from '../../models/Invoice/InvoicesResponse';
import axios, { AxiosError } from 'axios';
import { PaginationResponse } from '../../models/Pagination/PaginationResponse';
import apiRequest from '../../utils/apiRequest';

export async function getUserInvoices(pageNumber: number, pageSize: number) {
  try {
    console.log('TUTAJ');
    const params = new URLSearchParams({
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString(),
    });
    const url = '/invoice?' + params;
    const { data } = await apiRequest.get<PaginationResponse<InvoicesResponse>>(
      url,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (error as AxiosError<string>).response?.data;
    }

    return 'Somethink went wrong...';
  }
}
