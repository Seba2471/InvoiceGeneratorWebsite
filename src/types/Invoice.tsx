export interface Invoice {
  invoiceNumber: string;
  invoiceItems: Array<InvoiceItem>;
  soldDate: string;
  issueDate: string;
  seller: InvoicePerson;
  buyer: InvoicePerson;
  vatRate: number;
  currency: string;
}

export interface InvoiceShortInfo {
  invoiceNumber: string;
  issueDate: string;
  sellerFullName: string;
  buyerFullName: string;
  amount: number;
  currency: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  cost: number;
}

export interface InvoicePerson {
  fullName: string;
  nip: string;
  address: InvoicePersonAddres;
}

export interface InvoicePersonAddres {
  line1: string;
  line2: string;
  country: string;
}
