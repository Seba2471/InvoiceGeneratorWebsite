import { FormProperty } from '../../Forms/FormProperty';

export type InvoiceFormPersonAddresType = {
  line1: FormProperty<string>;
  line2: FormProperty<string>;
  country: FormProperty<string>;
};

export type InvoiceFormPersonType = {
  fullName: FormProperty<string>;
  nip: FormProperty<string>;
  address: InvoiceFormPersonAddresType;
};

export type InvoiceFormItemType = {
  name: FormProperty<string>;
  quantity: FormProperty<number>;
  cost: FormProperty<number>;
};

export type InvoiceFormType = {
  invoiceNumber: FormProperty<string>;
  issueDate: FormProperty<string>;
  soldDate: FormProperty<string>;
  seller: InvoiceFormPersonType;
  buyer: InvoiceFormPersonType;
  vatRate: FormProperty<number>;
  currency: FormProperty<string>;
  invoiceItems: FormProperty<Array<InvoiceFormItemType>>;
};
