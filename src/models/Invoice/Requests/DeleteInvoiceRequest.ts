import { PaginationRequest } from '../../Pagination/PaginationRequest';
export interface DeleteInvoiceRequest extends PaginationRequest {
  invoiceId: string;
}
