import React, { useEffect, useState } from 'react';
import { InvoiceShortInfo } from '../../types/InvoiceType';
import InvoicesTable from '../../components/InvoicesTable/InvoicesTable';
import invoiceServices from '../../services/InvoiceServices';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

export default function Invoices() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Array<InvoiceShortInfo>>([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: Number(searchParams.get('page')) | 1,
  });
  const [loading, setLoading] = useState(false);

  const getInvoices = async () => {
    setLoading(true);
    const data = await invoiceServices.getUserInvoices(pagination.page);
    if (data.totalPages < pagination.page) {
      setPagination({ totalPages: data.totalPages, page: 1 });
    } else {
      setPagination({ totalPages: data.totalPages, page: pagination.page });
      setInvoices(data.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getUserInvoices() {
      await getInvoices();
    }
    getUserInvoices();
  }, []);

  const deleteInvoice = (invoiceNumber: string) => {
    console.log(`Delete ${invoiceNumber}`);
  };
  const downoladInvoice = (invoiceNumber: string) => {
    console.log(`Downolad ${invoiceNumber}`);
  };

  useEffect(() => {
    if (pagination.page !== 1) {
      setSearchParams({
        page: pagination.page.toString(),
      });
    } else {
      setSearchParams();
    }
    async function getUserInvoices() {
      await getInvoices();
    }
    getUserInvoices();
  }, [pagination.page]);

  return (
    <div className='row'>
      <h4>Moje faktury </h4>
      {loading ? (
        <div className='col-12 text-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <InvoicesTable
            invoices={invoices}
            deleteInvoice={(invoiceNumber: string) =>
              deleteInvoice(invoiceNumber)
            }
            downoladInvoice={(invoiceNumber: string) =>
              downoladInvoice(invoiceNumber)
            }
          />
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            setPage={(page: number) => setPagination({ ...pagination, page })}
          />
        </>
      )}
    </div>
  );
}
