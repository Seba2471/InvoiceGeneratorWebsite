import React, { useState } from 'react';
import { downoladInvoiceFromData } from '../../../helpers/downoladInvoiceFromData';
import { Invoice, InvoiceItem, InvoicePerson } from '../../../types/Invoice';
import moment from 'moment';
import InputText from '../../UI/Form/InputText';
import InputDate from '../../UI/Form/InputDate';
import PersonForm from './PersonForm/PersonForm';
import InvoiceItemsTable from './InvoiceItemsTable/InvoiceItemsTable';
import styles from './InvoiceForm.module.css';
import InvoiceItemsMobileTable from './InvoiceItemsMobileTable/InvoiceItemsMobileTable';

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

  const addItem = (e: Event) => {
    e.preventDefault();

    const newItem: InvoiceItem = {
      name: '',
      quantity: 1,
      cost: 0,
    };

    const newArray = [...invoiceItems, newItem];

    setInvoiceItems(newArray);
  };

  const removeItem = (index: number) => {
    const newList = [...invoiceItems];
    newList.splice(index, 1);
    setInvoiceItems(newList);
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
      vatRate: invoiceVatRate,
      currency: invoiceCurrency,
    };

    downoladInvoiceFromData(invoiceData);
  };

  const changeCurrency = (value: string) => {
    setInvoiceCurrency(value);
  };

  const changeVatRate = (value: number) => {
    setInvoiceVatRate(value);
  };

  return (
    <div className={`${styles.main} p-5`}>
      <h4> Nowa faktura </h4>
      <span> Wypełnij dane faktury</span>
      <form className='mt-4' onSubmit={(e) => generateInvoice(e)}>
        <div className='row'>
          <div className='col-12 col-md-12 col-lg-4'>
            <InputText
              className='col-lg-12 col-md-4'
              label='Numer faktury'
              value={invoiceNumber}
              onChange={(value: string) => setInvoiceNumber(value)}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4 mt-md-3 mt-lg-0'>
            <InputDate
              label='Data sprzedaży'
              value={invoiceSoldDate}
              onChange={(value: string) => setInvoiceSoldDate(value)}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4 mt-md-3 mt-lg-0'>
            <InputDate
              label='Data wystawienia'
              value={invoiceIssueDate}
              onChange={(value: string) => setInvoiceIssueDate(value)}
            />
          </div>
          <div className='col-12 col-md-5 mt-4 offset-md-1'>
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
          <div className='col-12 col-md-5 mt-4'>
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
            <div className='d-none d-md-block'>
              <InvoiceItemsTable
                items={invoiceItems}
                vatRate={invoiceVatRate}
                currency={invoiceCurrency}
                changeItem={changeItem}
                changeCurrency={changeCurrency}
                changeVatRate={changeVatRate}
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>
            <div className='d-md-none'>
              <InvoiceItemsMobileTable
                items={invoiceItems}
                vatRate={invoiceVatRate}
                currency={invoiceCurrency}
                changeItem={changeItem}
                changeCurrency={changeCurrency}
                changeVatRate={changeVatRate}
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>
          </div>
        </div>
        <button className='btn btn-success p-3 ps-5 pe-5'>
          Wygeneruj fakturę
        </button>
      </form>
    </div>
  );
}
