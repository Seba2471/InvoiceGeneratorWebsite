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
