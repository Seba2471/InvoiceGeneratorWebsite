import React, { useCallback, useEffect, useState } from 'react';
import { InvoiceShortInfo } from '../../types/InvoiceType';
import InvoicesTable from '../../components/InvoicesTable/InvoicesTable';
import invoiceServices from '../../services/InvoiceServices';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Invoices() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Array<InvoiceShortInfo>>([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: Number(searchParams.get('page')) | 1,
    itemsFrom: 1,
    itemsTo: 10,
    totalItemsCount: 10,
  });
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState({
    loading: false,
    invoiceId: '',
  });
  const errorNotify = (message: string) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const successNotify = (message: string) =>
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const getInvoices = useCallback(async () => {
    setLoading(true);
    const data = await invoiceServices.getUserInvoices(pagination.page);
    if (data.totalPages < pagination.page) {
      setPagination({
        itemsFrom: data.itemsFrom,
        itemsTo: data.itemsTo,
        totalItemsCount: data.totalItemsCount,
        totalPages: data.totalPages,
        page: 1,
      });
    } else {
      setPagination((x) => ({
        itemsFrom: data.itemsFrom,
        itemsTo: data.itemsTo,
        totalItemsCount: data.totalItemsCount,
        totalPages: data.totalPages,
        page: x.page,
      }));
      setInvoices(data.items);
    }
    setLoading(false);
  }, [setPagination, pagination.page]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  const deleteInvoice = async (invoiceId: string) => {
    const deleteInvoice = async () => {
      const success = await invoiceServices.deleteUserInvoices(invoiceId);
      console.log(success);
      if (success) {
        await getInvoices();
        successNotify('Faktura została usunięta!');
      } else {
        errorNotify('Nie udało się usunąć faktury!');
      }
    };
    confirmAlert({
      message: 'Czy na pewno chcesz usunąć fakturę ?',
      buttons: [
        {
          label: 'Tak',
          onClick: async () => await deleteInvoice(),
        },
        {
          label: 'Nie',
        },
      ],
    });
  };
  const downoladInvoice = async (invoiceId: string, invoiceNumber: string) => {
    setDownloadLoading({ loading: true, invoiceId });
    const success = await invoiceServices.downoladInvoices(
      invoiceId,
      invoiceNumber,
    );
    if (success) {
      successNotify('Faktura została pobrana!');
    } else {
      errorNotify('Nie udało się pobrać faktury!');
    }
    setDownloadLoading({ loading: false, invoiceId: '' });
  };

  useEffect(() => {
    if (pagination.page !== 1) {
      setSearchParams({
        page: pagination.page.toString(),
      });
    } else {
      setSearchParams();
    }
    getInvoices();
  }, [getInvoices, setSearchParams, pagination.page]);

  const itemText = `${pagination.itemsFrom} - ${pagination.itemsTo} z
  ${pagination.totalItemsCount}`;

  return (
    <div className='row'>
      <h4>Moje faktury </h4>
      {loading ? (
        <div className='col-12 text-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='mt-3'>
            <span> {itemText}</span>
          </div>
          <InvoicesTable
            invoices={invoices}
            deleteInvoice={async (invoiceId: string) =>
              await deleteInvoice(invoiceId)
            }
            downoladInvoice={(invoiceId: string, invoiceNumber: string) =>
              downoladInvoice(invoiceId, invoiceNumber)
            }
            loading={downloadLoading}
          />
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            setPage={(page: number) => setPagination({ ...pagination, page })}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
}
