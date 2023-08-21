export interface IInvoicePerson {
  fullName: string;
  nip: number;
  address: {
    line1: string;
    line2?: string;
    country: string;
  };
}
