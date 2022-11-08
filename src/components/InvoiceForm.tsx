import React, { useEffect, useState } from 'react';
import { Invoice } from '../types/Invoice';
import moment from 'moment';
import InputText from './UI/Form/InputText';

export default function InvoiceForm() {
  const [invoice, setInvoice] = useState<Invoice>({
    InvoiceNumber: '',
    InvoiceItems: [
      {
        Name: '',
        Quantity: 1,
        Cost: 0,
        Value: 0,
      },
    ],
    SoldDate: moment().format(),
    IssueDate: moment().format(),
    Seller: {
      FullName: '',
      NIP: '',
      Address: {
        Line1: '',
        Line2: '',
        Country: '',
      },
    },
    Buyer: {
      FullName: '',
      NIP: '',
      Address: {
        Line1: '',
        Line2: '',
        Country: '',
      },
    },
  });

  return (
    <div>
      <form>
        <InputText
          label='Numer faktury'
          value=''
          onChange={(e: String) => console.log(e)}
        />
      </form>
    </div>
  );
}
