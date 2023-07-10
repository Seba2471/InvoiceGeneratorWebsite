import React, { useCallback, useEffect, useState } from 'react';
import { InvoiceShortInfo } from '../../types/Invoice/InvoiceType';
import InvoicesList from '../../components/Invoices/InvoicesTable/InvoicesList';
import invoiceServices from '../../services/InvoiceServices';
import { useSearchParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosGet from '../../services/axiosGet';
import ErrorAlert from '../../components/UI/Alerts/ErrorAlert';
import successNotify from '../../helpers/notify/successNotify';
import errorNotify from '../../helpers/notify/errorNotify';
import PageTitle from '../../components/Shared/PageTitle/PageTitle';
import './Invoices.scss';
import { Pagination } from '@mui/material';
import InvoicesListSkeleton from '../../components/Invoices/InvoicesTable/InvoicesList.Skeleton';

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

  const fetchInvoice = useCallback(
    (page: string) => {
      setLoading(true);
      const controller = new AbortController();
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
    },
    [pagination.page],
  );

  useEffect(() => {
    fetchInvoice('1');
  }, [fetchInvoice]);

  const deleteInvoice = async (invoiceId: string) => {
    const deleteInvoice = async () => {
      const success = await invoiceServices.deleteUserInvoices(invoiceId);
      if (success) {
        fetchInvoice(pagination.page.toString());
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
    // eslint-disable-next-line
  }, [fetchInvoice, setSearchParams, pagination.page]);

  const dataList = (
    <>
      <InvoicesList
        invoices={invoices}
        deleteInvoice={async (invoiceId: string) =>
          await deleteInvoice(invoiceId)
        }
        downoladInvoice={(invoiceId: string, invoiceNumber: string) =>
          downoladInvoice(invoiceId, invoiceNumber)
        }
        loading={downloadLoading}
      />
    </>
  );

  return (
    <div className="invoices">
      <PageTitle value="Moje faktury" />
      {loading ? (
        <InvoicesListSkeleton items={10} />
      ) : error.show ? (
        <ErrorAlert error={error.message} />
      ) : (
        dataList
      )}
      <Pagination
        className="invoices__pagination"
        size="large"
        count={pagination.totalPages}
        page={pagination.page}
        onChange={(event, page: number) =>
          setPagination({ ...pagination, page })
        }
      />

      <ToastContainer />
    </div>
  );
}
