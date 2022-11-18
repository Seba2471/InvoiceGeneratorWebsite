import React from 'react';
import { InvoiceShortInfo } from '../../types/Invoice';
import Actions from './Actions/Actions';

export default function InvoicesTable(props: {
  invoices: Array<InvoiceShortInfo>;
  deleteInvoice: Function;
  downoladInvoice: Function;
}) {
  const deleteInvoice = (invoiceNumber: string) => {
    props.deleteInvoice(invoiceNumber);
  };

  const downoladInvoice = (invoiceNumber: string) => {
    props.downoladInvoice(invoiceNumber);
  };

  return (
    <table className='table mt-5'>
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
          <tr key={invoice.invoiceNumber}>
            <th> {invoice.invoiceNumber}</th>
            <th> {invoice.issueDate} </th>
            <th> {invoice.sellerFullName} </th>
            <th> {invoice.buyerFullName} </th>
            <th>
              {invoice.amount} {invoice.currency}
            </th>
            <th>
              <Actions
                onDelete={() => deleteInvoice(invoice.invoiceNumber)}
                onDownolad={() => downoladInvoice(invoice.invoiceNumber)}
              />
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
