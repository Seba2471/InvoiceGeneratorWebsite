import { NewInvoice } from '../../models/Invoice/Requests/NewInvoiceRequest';
import { InvoicesResponse } from '../../models/Invoice/Response/InvoicesResponse';
import { PaginationResponse } from '../../models/Pagination/PaginationResponse';
import apiRequest from '../../utils/apiRequest';
import { downloadBlobFile } from '../../utils/downloadBlobFile';

export async function createNewInvoiceRequest(data: NewInvoice) {
  try {
    const response = await apiRequest.post('invoice', data, {
      responseType: 'blob',
    });
    downloadBlobFile(response.data, data.invoiceNumber);
  } catch (error) {
    throw error;
  }
}

export async function getUserInvoicesRequest(
  pageNumber: number,
  pageSize: number,
) {
  try {
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
    throw error;
  }
}

export async function deleteInvoiceRequest(id: string) {
  try {
    await apiRequest.delete('/invoice/' + id);
  } catch (error) {
    throw error;
  }
}

export async function downloadInvoiceRequest(id: string) {
  try {
    const { data } = await apiRequest.get(`invoice/downolad/${id}`, {
      responseType: 'blob',
    });
    return { data, success: true };
  } catch (error) {
    throw error;
  }
}
