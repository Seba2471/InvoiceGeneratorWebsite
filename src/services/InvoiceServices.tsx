import axiosInstance from '../axios';

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
  getUserInvoices: async (page: number) => {
    const params = new URLSearchParams({
      pageSize: '10',
      pageNumber: page.toString(),
    });

    const url = 'invoice?' + params;

    const response = await axiosInstance.get(url);

    return await response.data;
  },
  deleteUserInvoices: async (invoiceId: string) => {
    try {
      await axiosInstance.delete(`invoice/${invoiceId}`);
      return true;
    } catch (e) {
      return false;
    }
  },
  downoladInvoices: async (invoiceId: string, invoiceNumber: string) => {
    try {
      const response = await axiosInstance.get(
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
};

export default invoiceServices;