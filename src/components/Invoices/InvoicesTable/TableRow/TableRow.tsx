import React from 'react';
import { InvoiceShortInfo } from '../../../../types/Invoice/InvoiceType';
import Actions from '../../../UI/Actions/Actions';
import DeleteAction from '../../../UI/Actions/DeleteAction';
import DownloadAction from '../../../UI/Actions/DownloadAction';

interface PropsTypes extends InvoiceShortInfo {
  loading: {
    invoiceId: string;
    loading: boolean;
  };
  deleteInvoice: Function;
  downoladInvoice: Function;
  className?: string;
}

export default function TableRow(props: PropsTypes) {
  return (
    <div
      key={props.id}
      className={`${props.className} row d-flex justify-content-center text-center align-items-center`}
    >
      <div className="offset-8 col-2 offset-md-0 col-md-12 d-lg-none justify-content-start d-md-flex">
        <DeleteAction size={25} onDelete={props.deleteInvoice} />
      </div>
      <div className="col-12 col-md-3 mt-2 d-lg-none">Number faktury</div>
      <div className="col-12 col-md-3 col-lg-2"> {props.invoiceNumber}</div>
      <div className="col-12 col-md-3 mt-2 d-lg-none">Data wystawienia</div>
      <div className="col-12 col-md-3 col-lg-2">
        {props.issueDate.split('T')[0]}
      </div>
      <div className="col-12 col-md-6 mt-2 d-lg-none">Sprzedający</div>
      <div className="col-12 col-md-6 mt-2 d-none d-md-flex d-lg-none justify-content-center">
        Kupujący
      </div>
      <div className="col-12 col-md-6 col-lg-2"> {props.sellerFullName} </div>
      <div className="col-12 mt-2 d-md-none">Kupujący</div>
      <div className="col-12 col-md-6  col-lg-2"> {props.buyerFullName} </div>
      <div className="col-12 d-md-flex col-md-2 mt-2 d-lg-none align-items-center justify-content-end">
        Kwota
      </div>
      <div className="col-12 d-flex col-md-3 col-lg-2 mt-md-2 justify-content-center justify-content-lg-center justify-content-md-start align-items-center">
        {props.amount} {props.currency}
      </div>
      <div className="d-none d-lg-flex col-md-2">
        <Actions
          onDelete={() => props.deleteInvoice(props.id)}
          onDownolad={() =>
            props.downoladInvoice(props.id, props.invoiceNumber)
          }
          loading={props.loading.invoiceId === props.id}
          disabled={props.loading.loading}
        />
      </div>
      <div className="col-12 offset-md-5 col-md-2 mt-2 d-lg-none">
        <DownloadAction
          loading={props.loading.loading}
          disabled={props.id === props.loading.invoiceId}
          onDownolad={props.downoladInvoice}
          size={45}
        />
      </div>
      <hr className="mt-3" />
    </div>
  );
}
