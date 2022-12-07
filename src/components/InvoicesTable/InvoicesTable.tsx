import React from 'react';
import { InvoiceShortInfo } from '../../types/Invoice/InvoiceType';
import Actions from './Actions/Actions';

export default function InvoicesTable(props: {
  invoices: Array<InvoiceShortInfo>;
  deleteInvoice: Function;
  downoladInvoice: Function;
  loading: { loading: boolean; invoiceId: string };
}) {
  const deleteInvoice = (invoiceId: string) => {
    props.deleteInvoice(invoiceId);
  };

  const downoladInvoice = (invoiceId: string, invoiceNumber: string) => {
    props.downoladInvoice(invoiceId, invoiceNumber);
  };

  return (
    <table className='table'>
      <thead>
        <tr className='text-center'>
          <th className='col-1'> Nr faktury</th>
          <th className='col-2'> Data wystawienia</th>
          <th className='col-3'> Sprzedajacy</th>
          <th className='col-3'> Kupujący</th>
          <th className='col-2'> Kwota</th>
          <th className='col-2'> Akcje </th>
        </tr>
      </thead>
      <tbody className='text-center align-middle'>
        {props.invoices.map((invoice) => (
          <tr key={invoice.id}>
            <th> {invoice.invoiceNumber}</th>
            <th> {invoice.issueDate} </th>
            <th> {invoice.sellerFullName} </th>
            <th> {invoice.buyerFullName} </th>
            <th>
              {invoice.amount} {invoice.currency}
            </th>
            <th>
              <Actions
                onDelete={() => deleteInvoice(invoice.id)}
                onDownolad={() =>
                  downoladInvoice(invoice.id, invoice.invoiceNumber)
                }
                loading={props.loading.invoiceId === invoice.id}
                disabled={props.loading.loading}
              />
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
