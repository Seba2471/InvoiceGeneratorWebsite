import React from 'react';
import { InvoiceShortInfo } from '../../../../types/Invoice/InvoiceType';
import DeleteAction from '../../../UI/Actions/DeleteAction';
import DownloadAction from '../../../UI/Actions/DownloadAction';
import './InvoiceListItem.scss';

interface PropsTypes extends InvoiceShortInfo {
  loading: {
    invoiceId: string;
    loading: boolean;
  };
  deleteInvoice: Function;
  downoladInvoice: Function;
}

export default function InvoiceListItem(props: PropsTypes) {
  return (
    <div key={props.id} className="invoice-list-item">
      <DeleteAction
        className="invoice-list-item__delete-icon"
        size={30}
        onDelete={props.deleteInvoice}
      />
      <div className="invoice-list-item__field-title">
        <p>Numer faktury</p>
      </div>
      <div className="invoice-list-item__field-value">
        <p>{props.invoiceNumber}</p>
      </div>
      <div className="invoice-list-item__field-title">
        <p>Data wystawienia</p>
      </div>
      <div className="invoice-list-item__field-value">
        <p>{props.issueDate.split('T')[0]}</p>
      </div>
      <div className="invoice-list-item__field-title">
        <p>Sprzedający</p>
      </div>
      <div className="invoice-list-item__field-value">
        <p>{props.sellerFullName}</p>
      </div>
      <div className="invoice-list-item__field-title">
        <p>Kupujący</p>
      </div>
      <div className="invoice-list-item__field-value">
        <p>{props.buyerFullName}</p>
      </div>
      <div className="invoice-list-item__field-title">
        <p>Kwota</p>
      </div>
      <div className="invoice-list-item__field-value">
        <p>{props.amount} </p>
        <p>{props.currency} </p>
      </div>
      <DownloadAction
        className="invoice-list-item__download-icon"
        loading={props.loading.loading}
        disabled={props.id === props.loading.invoiceId}
        onDownolad={props.downoladInvoice}
        size={30}
      />
      <hr className="invoice-list-item__underline" />
    </div>
  );
}
