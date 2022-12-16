import React from 'react';
import { InvoiceShortInfo } from '../../../types/Invoice/InvoiceType';
import TableHeader from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';

export default function InvoicesTable(props: {
  invoices: Array<InvoiceShortInfo>;
  deleteInvoice: Function;
  downoladInvoice: Function;
  loading: { loading: boolean; invoiceId: string };
}) {
  const deleteInvoice = (invoiceId: string) => {
    props.deleteInvoice(invoiceId);
    console.log(invoiceId);
  };

  const downoladInvoice = (invoiceId: string, invoiceNumber: string) => {
    props.downoladInvoice(invoiceId, invoiceNumber);
  };

  return (
    <div className="mt-3 mb-3">
      <TableHeader />
      {props.invoices.map((invoice) => (
        <TableRow
          key={invoice.id}
          {...invoice}
          deleteInvoice={deleteInvoice}
          downoladInvoice={(id: string, number: string) =>
            downoladInvoice(id, number)
          }
          loading={props.loading}
        />
      ))}
    </div>
  );
}
