import { axiosAuthInstance } from '../axios';
import { InvoiceFormType } from '../types/Invoice/Form/InvoiceFormType';
import mapInvoiceFormToInvoice from '../helpers/mappers/mapInvoiceFormToInvoice';

const downoladInvoice = (data: Blob, fileName: string) => {
  const href = URL.createObjectURL(data);

  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `Faktura-${fileName}.pdf`); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

const invoiceServices = {
  deleteUserInvoices: async (invoiceId: string) => {
    try {
      await axiosAuthInstance.delete(`invoice/${invoiceId}`);
      return true;
    } catch (e) {
      return false;
    }
  },
  downoladInvoices: async (invoiceId: string, invoiceNumber: string) => {
    try {
      const response = await axiosAuthInstance.get(
        `invoice/downolad/${invoiceId}`,
        {
          responseType: 'blob',
        },
      );
      downoladInvoice(response.data, invoiceNumber);
      return true;
    } catch (e) {
      return false;
    }
  },
  generateInvoice: async (formData: InvoiceFormType) => {
    try {
      const data = mapInvoiceFormToInvoice(formData);
      const response = await axiosAuthInstance.post('invoice', data, {
        responseType: 'blob',
      });
      downoladInvoice(response.data, data.invoiceNumber);
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default invoiceServices;
