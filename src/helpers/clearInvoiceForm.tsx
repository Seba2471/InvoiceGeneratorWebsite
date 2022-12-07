import {
  initString,
  initInvoiceFormValue,
  initPerson,
} from '../types/Invoice/Form/InvoiceFormInitState';

const clearInvoiceForm = () => {
  const form = initInvoiceFormValue;
  form.invoiceNumber = initString;
  form.seller = initPerson;
  form.buyer = initPerson;
  return form;
};

export default clearInvoiceForm;
