import axiosInstance from '../axios';
import { Invoice } from '../types/Invoice/InvoiceType';

export const downoladInvoiceFromData = async (data: Invoice) => {
  try {
    await axiosInstance
      .post('invoice', data, {
        responseType: 'blob',
      })
      .then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `Faktura-${data.invoiceNumber}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
  } catch (error: any) {
    return error;
  }
};
