import { NewInvoice } from '../models/Invoice/Requests/NewInvoiceRequest';
import { IInvoice } from '../types/Invoice/IInvoice';
const mapFromIInvoiceFormFieldsToNewInvoice = (from: IInvoice) => {
  return {
    invoiceNumber: from.invoiceNumber,
    issueDate: from.issueDate.toISOString(),
    soldDate: from.soldDate.toISOString(),
    seller: { ...from.seller, nip: 123 },
    buyer: { ...from.buyer },
    invoiceItems: [...from.items.values],
    currency: from.items.currency,
    vatRate: from.items.vatRate,
  } as NewInvoice;
};
export default mapFromIInvoiceFormFieldsToNewInvoice;
