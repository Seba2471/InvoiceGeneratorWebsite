import { InvoiceItem, InvoicePerson } from '../../types/Invoice/InvoiceTypes';

export interface NewInvoice {
  /**
   * Invoice number issued by user
   */
  invoiceNumber: string;
  /**
   * Array including invoice items
   */
  invoiceItems: Array<InvoiceItem>;
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
  seller: InvoicePerson;
  /**
   * Buyer specified on the invoice by the user
   */
  buyer: InvoicePerson;
  /**
   * Specific vat rate by the user
   */
  vatRate: number;
  /**
   * Invoice currency choosed by the user
   */
  currency: string;
}
