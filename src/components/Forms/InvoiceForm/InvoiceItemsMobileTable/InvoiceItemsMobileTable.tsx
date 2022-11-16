import React from 'react';
import { InvoiceItem } from '../../../../types/Invoice';
import Select from '../../../UI/Form/Select';
import MobileRow from './MobileRow/MobileRow';

type PropsTypes = {
  items: Array<InvoiceItem>;
  currency: string;
  vatRate: number;
  changeItem: Function;
  changeCurrency: Function;
  changeVatRate: Function;
  addItem: Function;
  removeItem: Function;
};

export default function InvoiceItemsMobileTable(props: PropsTypes) {
  return (
    <div className='mt-3 mb-4'>
      <h5 className='text-center'> Towary/usługi </h5>
      {props.items.map((row, index) => {
        return (
          <MobileRow
            key={index}
            index={index}
            name={row.name}
            quantity={row.quantity}
            cost={row.cost}
            onChange={(e: string, key: string) =>
              props.changeItem(e, index, key)
            }
            onRemove={props.removeItem}
          />
        );
      })}
      <button
        className='btn btn-success mt-3 col-12'
        onClick={(e) => props.addItem(e)}
      >
        Dodaj
      </button>
      <div className='row'>
        <div className=' col-12 mt-3 justify-content-center'>
          <Select
            options={[
              { value: 'EUR', label: 'EURO' },
              { value: 'PLN', label: 'PLN' },
            ]}
            label='Waluta'
            value={props.currency}
            onChange={(value: string) => props.changeCurrency(value)}
          />
        </div>
        <div className='col-12 mt-3 justify-content-center'>
          <Select
            options={[
              { value: 0, label: '0%' },
              { value: 15, label: '15%' },
              { value: 23, label: '23%' },
            ]}
            label='VAT [%]'
            value={props.vatRate}
            onChange={(value: number) => props.changeVatRate(value)}
          />
        </div>
      </div>
    </div>
  );
}
