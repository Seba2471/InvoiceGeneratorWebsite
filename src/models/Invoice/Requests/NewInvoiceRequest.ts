import { IInvoiceItemsValues } from './../../../types/Invoice/IInvoiceItem';
import { IInvoicePerson } from '../../../types/Invoice/IInvoicePerson';

export interface NewInvoice {
  /**
   * Invoice number issued by user
   */
  invoiceNumber: string;
  /**
   * Array including invoice items
   */
  invoiceItems: Array<IInvoiceItemsValues>;
  /**
   * Sold date choosed by user
   */
  soldDate: string;
  /**
   * Issue date choosed by user
   */
  issueDate: string;
  /**
   * Seller specified on the invoice by the user
   */
  seller: IInvoicePerson;
  /**
   * Buyer specified on the invoice by the user
   */
  buyer: IInvoicePerson;
  /**
   * Specific vat rate by the user
   */
  vatRate: number;
  /**
   * Invoice currency choosed by the user
   */
  currency: string;
}
