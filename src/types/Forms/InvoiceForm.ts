export interface IPersonFormFields {
  fullName: string;
  nip: number;
  address: {
    line1: string;
    line2?: string;
    country: string;
  };
}

export interface IInvoiceItemsValuesFormFields {
  name: string;
  quantity: number;
  cost: number;
}

export enum Currency {
  Zloty = 'Złoty',
  Euro = 'Euro',
}

export interface IInoivceItemsFormFields {
  currency: Currency;
  vatRate: number;
  values: Array<IInvoiceItemsValuesFormFields>;
}

export interface IInvoiceFormFields {
  invoiceNumber: string;
  soldDate: Date;
  issueDate: Date;
  seller: IPersonFormFields;
  buyer: IPersonFormFields;
  items: IInoivceItemsFormFields;
}
