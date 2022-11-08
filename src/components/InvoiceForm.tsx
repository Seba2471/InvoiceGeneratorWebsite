import React, { useEffect, useState } from 'react';
import { downoladInvoiceFromData } from '../helpers/downoladInvoiceFromData';
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

  useEffect(() => {
    setInvoice({
      InvoiceNumber: '34/11/2022',
      InvoiceItems: [
        {
          Name: 'test',
          Quantity: 1,
          Cost: 2000,
          Value: 2000,
        },
      ],
      SoldDate: moment().format(),
      IssueDate: moment().format(),
      Seller: {
        FullName: 'Kupiec',
        NIP: 'kupie NIP',
        Address: {
          Line1: 'kupie 1',
          Line2: 'kupie 2',
          Country: 'Polska',
        },
      },
      Buyer: {
        FullName: 'Kupiec',
        NIP: 'kupie NIP',
        Address: {
          Line1: 'kupie 1',
          Line2: 'kupie 2',
          Country: 'Polska',
        },
      },
    });
  }, []);

  const getPdf = async () => {
    downoladInvoiceFromData(invoice);
  };

  return (
    <div>
      <form>
        <InputText
          label='Numer faktury'
          value=''
          onChange={(e: string) => console.log(e)}
        />
      </form>
      <button onClick={async () => getPdf()}> Pobierz PDF </button>
    </div>
  );
}
