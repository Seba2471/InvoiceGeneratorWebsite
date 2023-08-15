import { InvoiceCurrency } from './InvoiceCurrency';

export interface IInvoiceItemsValues {
  name: string;
  quantity: number;
  cost: number;
}

export interface IInoivceItems {
  currency: InvoiceCurrency;
  vatRate: number;
  values: Array<IInvoiceItemsValues>;
}
