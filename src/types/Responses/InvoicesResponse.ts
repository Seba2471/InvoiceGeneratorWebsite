import { InvoiceShortInfo } from '../Invoice/InvoiceType';

export interface InvoiceResponse {
  items: Array<InvoiceShortInfo>;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
  totalPages: number;
}
