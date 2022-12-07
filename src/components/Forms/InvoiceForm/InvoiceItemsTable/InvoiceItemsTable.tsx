import React from 'react';
import Row from './Row/Row';
import Select from '../../../UI/Form/Select';
import { InvoiceFormItemType } from '../../../../types/Invoice/Form/InvoiceFormType';
import { FormProperty } from '../../../../types/FormProperty';
import ErrorAlert from '../../../UI/Alerts/ErrorAlert';

type PropsTypes = {
  className?: string;
  items: Array<InvoiceFormItemType>;
  error: string;
  showError: boolean;
  vatRate: FormProperty<number>;
  currency: FormProperty<string>;
  changeItem: Function;
  addItem: Function;
  removeItem: Function;
  changeCurrency: Function;
  changeVatRate: Function;
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
            <th />
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
                onRemove={props.removeItem}
              />
            );
          })}
        </tbody>
      </table>
      <div className='row'>
        <ErrorAlert error={props.error} />
        <button
          className='btn btn-success col-6 col-md-3'
          onClick={(e) => addItem(e)}
        >
          Dodaj
        </button>
      </div>
      <div className='row'>
        <div className=' col-12 offset-md-8 col-md-2'>
          <Select
            options={[
              { value: 'EUR', label: 'EURO' },
              { value: 'PLN', label: 'PLN' },
            ]}
            label='Waluta'
            value={props.currency.value}
            error={props.currency.error}
            showError={props.currency.showError}
            onChange={(value: string) => props.changeCurrency(value)}
          />
        </div>
        <div className='col-12 col-md-2'>
          <Select
            options={[
              { value: 0, label: '0%' },
              { value: 15, label: '15%' },
              { value: 23, label: '23%' },
            ]}
            label='VAT [%]'
            value={props.vatRate.value}
            error={props.vatRate.error}
            showError={props.vatRate.showError}
            onChange={(value: number) => props.changeVatRate(value)}
          />
        </div>
      </div>
    </div>
  );
}
