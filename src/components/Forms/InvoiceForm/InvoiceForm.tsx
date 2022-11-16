import React, { useEffect, useState } from 'react';
import { downoladInvoiceFromData } from '../../../helpers/downoladInvoiceFromData';
import { Invoice, InvoiceItem, InvoicePerson } from '../../../types/Invoice';
import moment from 'moment';
import InputText from '../../UI/Form/InputText';
import InputDate from '../../UI/Form/InputDate';
import PersonForm from './PersonForm/PersonForm';
import InvoiceItemsTable from './InvoiceItemsTable/InvoiceItemsTable';
import Select from '../../UI/Form/Select';

export default function InvoiceForm() {
  const [invoiceItems, setInvoiceItems] = useState<Array<InvoiceItem>>([]);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceSoldDate, setInvoiceSoldDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );
  const [invoiceIssueDate, setInvoiceIssueDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );
  const [invoiceSeller, setInvoiceSeller] = useState<InvoicePerson>({
    fullName: '',
    nip: '',
    address: {
      line1: '',
      line2: '',
      country: 'Polska',
    },
  });
  const [invoiceBuyer, setInvoiceBuyer] = useState<InvoicePerson>({
    fullName: '',
    nip: '',
    address: {
      line1: '',
      line2: '',
      country: 'Polska',
    },
  });
  const [invoiceCurrency, setInvoiceCurrency] = useState<string>('PLN');
  const [invoiceVatRate, setInvoiceVatRate] = useState<number>(0);

  const changeItem = (value: string, index: number, key: string) => {
    let newItems = [...invoiceItems];

    let item = newItems[index];

    const obj = {
      [key]: value,
    };

    Object.assign(item, obj);

    newItems[index] = item;

    setInvoiceItems(newItems);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      name: '',
      quantity: 1,
      cost: 0,
    };

    const newArray = [...invoiceItems, newItem];

    setInvoiceItems(newArray);
  };

  const generateInvoice = (e: any) => {
    e.preventDefault();

    const invoiceData: Invoice = {
      invoiceNumber: invoiceNumber,
      soldDate: invoiceSoldDate,
      issueDate: invoiceIssueDate,
      seller: invoiceSeller,
      buyer: invoiceBuyer,
      invoiceItems: invoiceItems,
      vatRate: 23,
      currency: 'EURO',
    };

    downoladInvoiceFromData(invoiceData);
  };

  return (
    <div className='card mt-5'>
      <div className='card-header'>Wypełnij dane faktury</div>
      <div className='card-body'>
        <form onSubmit={(e) => generateInvoice(e)}>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <InputText
                label='Numer faktury'
                value={invoiceNumber}
                onChange={(value: string) => setInvoiceNumber(value)}
              />
            </div>
            <div className='col-12 col-md-4'>
              <InputDate
                label='Data sprzedaży'
                value={invoiceSoldDate}
                onChange={(value: string) => setInvoiceSoldDate(value)}
              />
            </div>
            <div className='col-12 col-md-4'>
              <InputDate
                label='Data wystawienia'
                value={invoiceIssueDate}
                onChange={(value: string) => setInvoiceIssueDate(value)}
              />
            </div>
            <div className='col-12 col-md-4 mt-4 offset-md-1'>
              <PersonForm
                header='Sprzedający'
                fullName={invoiceSeller.fullName}
                nip={invoiceSeller.nip}
                line1={invoiceSeller.address.line1}
                line2={invoiceSeller.address.line2}
                onChangeFullName={(value: string) =>
                  setInvoiceSeller({ ...invoiceSeller, fullName: value })
                }
                onChangeAddresLine1={(value: string) =>
                  setInvoiceSeller({
                    ...invoiceSeller,
                    address: { ...invoiceSeller.address, line1: value },
                  })
                }
                onChangeAddresLine2={(value: string) =>
                  setInvoiceSeller({
                    ...invoiceSeller,
                    address: { ...invoiceSeller.address, line2: value },
                  })
                }
                onChangeNip={(value: string) =>
                  setInvoiceSeller({ ...invoiceSeller, nip: value })
                }
              />
            </div>
            <div className='col-12 col-md-4 mt-4 offset-md-1'>
              <PersonForm
                header='Nabywca'
                fullName={invoiceBuyer.fullName}
                nip={invoiceBuyer.nip}
                line1={invoiceBuyer.address.line1}
                line2={invoiceBuyer.address.line2}
                onChangeFullName={(value: string) =>
                  setInvoiceBuyer({ ...invoiceBuyer, fullName: value })
                }
                onChangeAddresLine1={(value: string) =>
                  setInvoiceBuyer({
                    ...invoiceBuyer,
                    address: { ...invoiceBuyer.address, line1: value },
                  })
                }
                onChangeAddresLine2={(value: string) =>
                  setInvoiceBuyer({
                    ...invoiceBuyer,
                    address: { ...invoiceBuyer.address, line2: value },
                  })
                }
                onChangeNip={(value: string) =>
                  setInvoiceBuyer({ ...invoiceBuyer, nip: value })
                }
              />
            </div>
            <div className='col-md-12'>
              <InvoiceItemsTable
                items={invoiceItems}
                vatRate={invoiceVatRate}
                currency={invoiceCurrency}
                className='ms-md-5 me-md-5'
                changeItem={changeItem}
                addItem={addItem}
              />
            </div>
          </div>
          <button className='btn btn-success mt-3'>Wygeneruj fakturę</button>
        </form>
      </div>
    </div>
  );
}
