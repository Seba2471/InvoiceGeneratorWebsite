export type Invoice = {
  invoiceNumber: string;
  invoiceItems: Array<InvoiceItem>;
  soldDate: string;
  issueDate: string;
  seller: InvoicePerson;
  buyer: InvoicePerson;
  vatRate: number;
  currency: string;
};

export type InvoiceItem = {
  name: string;
  quantity: number;
  cost: number;
};

export type InvoicePerson = {
  fullName: string;
  nip: string;
  address: InvoicePersonAddres;
};

export type InvoicePersonAddres = {
  line1: string;
  line2: string;
  country: string;
};
