import { InvoicesResponse } from '../../models/Invoice/Response/InvoicesResponse';

export interface InvoiceResponse {
  items: Array<InvoicesResponse>;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
  totalPages: number;
}
