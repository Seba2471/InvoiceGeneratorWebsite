import React from 'react';
import { InvoiceItem } from '../../../../types/Invoice';
import Row from './Row/Row';
import Select from '../../../UI/Form/Select';

type PropsTypes = {
  className: string;
  items: Array<InvoiceItem>;
  vatRate: number;
  currency: string;
  changeItem: Function;
  addItem: Function;
};

export default function InvoiceItemsTable(props: PropsTypes) {
  const className = props.className;

  const addItem = (e: any) => {
    e.preventDefault();
    props.addItem();
  };

  return (
    <div className={`${className} row`}>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th scope='col'>LP</th>
            <th className='col-8' scope='col'>
              Nazwa towaru / usługi
            </th>
            <th className='col-1' scope='col'>
              Ilość
            </th>
            <th scope='col'>Cena netto</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((row, index) => {
            return (
              <Row
                key={index}
                index={index}
                name={row.name}
                quantity={row.quantity}
                cost={row.cost}
                onChange={(e: string, key: string) =>
                  props.changeItem(e, index, key)
                }
              />
            );
          })}
        </tbody>
      </table>
      <div className='row'>
        <button className='btn btn-success col-1' onClick={(e) => addItem(e)}>
          Dodaj
        </button>
      </div>
      <div className='row'>
        <div className='col-1 offset-10'>
          <Select
            options={[
              { value: 'EUR', label: 'EURO' },
              { value: 'PLN', label: 'PLN' },
            ]}
            label='Waluta'
            value={props.currency}
            onChange={(e: any) => console.log(e)}
          />
        </div>
        <div className='col-1'>
          <Select
            options={[
              { value: 'EUR', label: 'EURO' },
              { value: 'PLN', label: 'PLN' },
            ]}
            label='VAT [%]'
            value={props.currency}
            onChange={(e: any) => console.log(e)}
          />
        </div>
      </div>
    </div>
  );
}
