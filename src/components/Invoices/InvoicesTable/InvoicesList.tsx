import React from 'react';
import { InvoicesResponse } from '../../../models/Invoice/InvoicesResponse';
import InvoiceListItem from './InvoiceListItem/InvoiceListItem';
import './InvoicesList.scss';

export default function InvoicesList(props: {
  invoices: Array<InvoicesResponse>;
  deleteInvoice: Function;
  downoladInvoice: Function;
}) {
  const deleteInvoice = (invoiceId: string) => {
    props.deleteInvoice(invoiceId);
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
          deleteInvoice={() => deleteInvoice(invoice.id)}
          downoladInvoice={() =>
            downoladInvoice(invoice.id, invoice.invoiceNumber)
          }
        />
      ))}
    </div>
  );
}
