import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './InvoiceItemTable.scss';
import InvoiceItem from './InvoiceItem/InvoiceItem';
import Select from '../../../UI/Form/Select';
import {
  IInoivceItemsFormFields,
  IInvoiceItemsValuesFormFields,
} from '../../../../types/Forms/InvoiceForm';
import updateProperty from '../../../../utils/updateProperty';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type PropsTypes = {
  className?: string;
  errors?: Merge<FieldError, FieldErrorsImpl<IInoivceItemsFormFields>>;
  onChange: Function;
  items: IInoivceItemsFormFields;
};

export default function InvoiceItemsTable(props: PropsTypes) {
  const { items, onChange, errors } = props;
  const { values, currency, vatRate } = items;
  const [showItems, setShowItems] = useState(true);
  const emptyItem: IInvoiceItemsValuesFormFields = {
    name: '',
    quantity: 0,
    cost: 0,
  };

  const addItem = (e: any) => {
    e.preventDefault();
    const newValues = [...values, emptyItem];
    const newItem = updateProperty(items, newValues, 'values');
    onChange(newItem);
  };

  const removeItem = (indexToRemove: Number) => {
    const newValues = values.filter((_, index) => index !== indexToRemove);
    const newItem = updateProperty(items, newValues, 'values');
    onChange(newItem);
  };

  const changeItem = (
    indexToUpdate: number,
    value: string | number,
    key: string,
  ) => {
    if (indexToUpdate >= 0 && indexToUpdate < values.length) {
      const valuesToUpdate = [...values];
      valuesToUpdate[indexToUpdate] = {
        ...valuesToUpdate[indexToUpdate],
        [key]: value,
      };
      onChange({ ...items, values: valuesToUpdate });
    }
  };

  return (
    <div className={`invoice-items-table ${props.className}`}>
      <div className="invoice-items-table__title-counter-wrapper">
        <h3 className="invoice-items-table__title">Towary/usługi</h3>
        {values.length > 0 ? (
          <div className="invoice-items-table__items-counter-box">
            <p className="invoice-items-table__items-counter">
              {values.length}
            </p>
          </div>
        ) : null}
      </div>
      <FiChevronDown
        className={`invoice-items-table__icon ${
          showItems ? '' : 'invoice-items-table__items--collapsed'
        }`}
        onClick={() => setShowItems(!showItems)}
      />

      {showItems ? (
        <>
          <div className="invoice-items-table__desktop-top-bar">
            <div className="invoice-items-table__desktop-top-bar-lp">Lp</div>
            <div className="invoice-items-table__desktop-top-bar-name">
              Nazwa
            </div>
            <div className="invoice-items-table__desktop-top-bar-quantity">
              Ilość
            </div>
            <div className="invoice-items-table__desktop-top-bar-cost">
              Cena/szt.
            </div>
            <div className="invoice-items-table__desktop-top-bar-action"></div>
          </div>
          <div className="invoice-items-table__items">
            {items.values.map((row, index) => {
              return (
                <InvoiceItem
                  key={index}
                  index={index}
                  name={row.name}
                  quantity={row.quantity}
                  cost={row.cost}
                  errors={errors?.values?.[index]}
                  onChange={(e: string | number, key: string) =>
                    changeItem(index, e, key)
                  }
                  onRemove={() => removeItem(index)}
                />
              );
            })}
            <button
              className="btn invoice-items-table__add-btn"
              onClick={(e) => addItem(e)}
            >
              Dodaj
            </button>
          </div>
          <div className="invoice-items-table__select">
            <Select
              className="invoice-items-table__select-currency"
              options={[
                { value: 'EUR', label: 'EURO' },
                { value: 'PLN', label: 'PLN' },
              ]}
              label="Waluta"
              value={currency}
              error={errors?.currency?.message}
              onChange={(val: string) =>
                onChange(updateProperty(items, val, 'currency'))
              }
            />
            <Select
              className="invoice-items-table__select-vat"
              options={[
                { value: 0, label: '0%' },
                { value: 15, label: '15%' },
                { value: 23, label: '23%' },
              ]}
              label="VAT [%]"
              value={vatRate.toString()}
              error={errors?.vatRate?.message}
              onChange={(val: number) =>
                onChange(updateProperty(items, val, 'vatRate'))
              }
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
