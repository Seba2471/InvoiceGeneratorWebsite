import { IInoivceItems } from './IInvoiceItem';
import { IInvoicePerson } from './IInvoicePerson';

export interface IInvoice {
  invoiceNumber: string;
  soldDate: Date;
  issueDate: Date;
  seller: IInvoicePerson;
  buyer: IInvoicePerson;
  items: IInoivceItems;
}
