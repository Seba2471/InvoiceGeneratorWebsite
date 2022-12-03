import { InvoiceFormType } from '../../components/Forms/InvoiceForm/InvoiceFormType';
import { Invoice } from '../../types/InvoiceType';
import mapInvoiceFormItemToInvoiceItem from './mapInvoiceFormItemToInvoiceItem';

const mapInvoiceFormToInvoice = (form: InvoiceFormType) => {
  const mappedInvoiceItems = mapInvoiceFormItemToInvoiceItem(form.invoiceItems);

  const invoiceData: Invoice = {
    invoiceNumber: form.invoiceNumber.value,
    soldDate: form.soldDate.value,
    issueDate: form.issueDate.value,
    seller: {
      fullName: form.seller.fullName.value,
      address: {
        line1: form.seller.address.line1.value,
        line2: form.seller.address.line2.value,
        country: 'Polska',
      },
      nip: form.seller.nip.value,
    },
    buyer: {
      fullName: form.buyer.fullName.value,
      address: {
        line1: form.buyer.address.line1.value,
        line2: form.buyer.address.line2.value,
        country: 'Polska',
      },
      nip: form.buyer.nip.value,
    },
    invoiceItems: mappedInvoiceItems,
    vatRate: form.vatRate.value,
    currency: form.currency.value,
  };

  return invoiceData;
};

export default mapInvoiceFormToInvoice;
