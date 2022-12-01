import axiosInstance from '../axios';

const invoiceServices = {
  getUserInvoices: async (page: number) => {
    const params = new URLSearchParams({
      pageSize: '5',
      pageNumber: page.toString(),
    });

    const url = 'invoice?' + params;

    const response = await axiosInstance.get(url);

    return await response.data;
  },
};

export default invoiceServices;
