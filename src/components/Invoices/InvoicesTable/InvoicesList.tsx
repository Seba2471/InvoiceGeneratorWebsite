import React from 'react';
import { InvoiceShortInfo } from '../../../types/Invoice/InvoiceType';
import InvoiceListItem from './InvoiceListItem/InvoiceListItem';
import './InvoicesList.scss';

export default function InvoicesList(props: {
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
    <div className="invoice-list">
      {props.invoices.map((invoice) => (
        <InvoiceListItem
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
