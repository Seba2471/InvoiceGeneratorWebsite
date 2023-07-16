import React, { useCallback, useEffect, useState } from 'react';
import { InvoicesResponse } from '../../models/Invoice/InvoicesResponse';
import InvoicesList from '../../components/Invoices/InvoicesTable/InvoicesList';
import { useSearchParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ErrorAlert from '../../components/UI/Alerts/ErrorAlert';
import PageTitle from '../../components/Shared/PageTitle/PageTitle';
import InvoicesListSkeleton from '../../components/Invoices/InvoicesTable/InvoicesList.Skeleton';
import {
  getInvoicesDataSelector,
  getInvoicesErrorSelector,
  invoicesActions,
} from '../../data/invoices/invoices';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationResponse } from '../../models/Pagination/PaginationResponse';
import { Pagination } from '@mui/material';
import { getUiIsLoading } from '../../data/ui/ui';
import './Invoices.scss';

export default function Invoices() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const data: PaginationResponse<InvoicesResponse> = useSelector(
    getInvoicesDataSelector,
  );
  const loading = useSelector(getUiIsLoading);
  const error = useSelector(getInvoicesErrorSelector);
  const pageSize = 10;
  const dispatch = useDispatch();
  const fetchInvoices = useCallback(
    (pageNumber: number) => {
      dispatch(invoicesActions.fetch({ pageNumber, pageSize }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (data.totalPages === 1) {
      setSearchParams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const currentPage = Number(searchParams.get('page')) | 1;
    setPage(currentPage);
    fetchInvoices(Number(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInvoices]);

  const deleteInvoiceHandler = async (invoiceId: string) => {
    confirmAlert({
      message: 'Czy na pewno chcesz usunąć fakturę ?',
      buttons: [
        {
          label: 'Tak',
          onClick: async () =>
            dispatch(
              invoicesActions.delete({
                pageNumber: page,
                pageSize: pageSize,
                invoiceId: invoiceId,
              }),
            ),
        },
        {
          label: 'Nie',
        },
      ],
    });
  };

  const changePageHandler = (newPageNumber: number) => {
    console.log(newPageNumber);
    fetchInvoices(newPageNumber);
    setPage(newPageNumber);
    if (newPageNumber === 1) {
      setSearchParams();
    } else {
      setSearchParams({
        page: newPageNumber.toString(),
      });
    }
  };

  const dataList = (
    <>
      <InvoicesList
        invoices={data.items}
        deleteInvoice={(invoiceId: string) => deleteInvoiceHandler(invoiceId)}
        downoladInvoice={(invoiceId: string, invoiceNumber: string) =>
          dispatch(invoicesActions.download({ invoiceId, invoiceNumber }))
        }
      />
      <Pagination
        className="invoices__pagination"
        size="large"
        count={data.totalPages}
        page={page}
        onChange={(event, newPageNumber: number) =>
          changePageHandler(newPageNumber)
        }
      />
    </>
  );
  return (
    <div className="invoices">
      <PageTitle value="Moje faktury" />
      {loading ? (
        <InvoicesListSkeleton items={10} />
      ) : error.show ? (
        <ErrorAlert
          error={'Nie udało się pobrać faktur, spróbuj ponownie później.'}
        />
      ) : (
        dataList
      )}
    </div>
  );
}
