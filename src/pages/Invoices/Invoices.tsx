import React, { useCallback, useEffect, useState } from 'react';
import { InvoiceShortInfo } from '../../types/Invoice/InvoiceType';
import InvoicesTable from '../../components/InvoicesTable/InvoicesTable';
import invoiceServices from '../../services/InvoiceServices';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosGet from '../../services/axiosGet';
import ErrorAlert from '../../components/UI/Alerts/ErrorAlert';
import successNotify from '../../helpers/notify/successNotify';
import errorNotify from '../../helpers/notify/errorNotify';

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

  const [error, setError] = useState({
    show: false,
    message: '',
  });

  const fetchInvoice = useCallback((page: string) => {
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({
      pageSize: '10',
      pageNumber: page,
    });

    const url = 'invoice?' + params;
    axiosGet(url, controller.signal).then((response) => {
      if (response?.data) {
        if (response.data.totalPages < pagination.page) {
          setPagination({
            itemsFrom: response.data.itemsFrom,
            itemsTo: response.data.itemsTo,
            totalItemsCount: response.data.totalItemsCount,
            totalPages: response.data.totalPages,
            page: 1,
          });
        } else {
          setPagination((x) => ({
            itemsFrom: response.data.itemsFrom,
            itemsTo: response.data.itemsTo,
            totalItemsCount: response.data.totalItemsCount,
            totalPages: response.data.totalPages,
            page: x.page,
          }));
        }
        setInvoices(response.data.items);
      } else {
        if (response.error !== 'Request was canceled') {
          setError({ show: true, message: 'Nie udało się pobrać faktur!' });
        }
      }
    });
    setLoading(false);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    return fetchInvoice('1');
  }, [fetchInvoice]);

  const deleteInvoice = async (invoiceId: string) => {
    const deleteInvoice = async () => {
      const success = await invoiceServices.deleteUserInvoices(invoiceId);
      console.log(success);
      if (success) {
        // await getInvoices();
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
    if (invoices.length !== 0) {
      return fetchInvoice(pagination.page.toString());
    }
  }, [fetchInvoice, setSearchParams, pagination.page]);

  const itemText = `${pagination.itemsFrom} - ${pagination.itemsTo} z
  ${pagination.totalItemsCount}`;

  const dataTabel = (
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
  );

  const spinner = (
    <div className='col-12 text-center'>
      <Spinner />
    </div>
  );

  return (
    <div className='row'>
      <h4>Moje faktury </h4>
      {loading ? (
        spinner
      ) : error.show ? (
        <ErrorAlert error={error.message} />
      ) : (
        dataTabel
      )}
      <ToastContainer />
    </div>
  );
}
