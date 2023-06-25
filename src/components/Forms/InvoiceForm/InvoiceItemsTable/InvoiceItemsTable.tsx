import React, { useEffect, useState } from 'react';
import { InvoiceFormItemType } from '../../../../types/Invoice/Form/InvoiceFormType';
import { FormProperty } from '../../../../types/Forms/FormProperty';
import { FiChevronDown } from 'react-icons/fi';
import './InvoiceItemTable.scss';
import InvoiceItem from './InvoiceItem/InvoiceItem';
import Select from '../../../UI/Form/Select';

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
  const [showItems, setShowItems] = useState(true);
  const addItem = (e: any) => {
    e.preventDefault();
    props.addItem();
  };

  useEffect(() => {
    props.addItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`invoice-items-table ${props.className}`}>
      <div className="invoice-items-table__title-counter-wrapper">
        <h3 className="invoice-items-table__title">Towary/usługi</h3>
        {props.items.length > 0 ? (
          <div className="invoice-items-table__items-counter-box">
            <p className="invoice-items-table__items-counter">
              {props.items.length}
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
            {props.items.map((row, index) => {
              return (
                <InvoiceItem
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
              value={props.currency.value}
              error={props.currency.error}
              showError={props.currency.showError}
              onChange={(value: string) => props.changeCurrency(value)}
            />
            <Select
              className="invoice-items-table__select-vat"
              options={[
                { value: 0, label: '0%' },
                { value: 15, label: '15%' },
                { value: 23, label: '23%' },
              ]}
              label="VAT [%]"
              value={props.vatRate.value}
              error={props.vatRate.error}
              showError={props.vatRate.showError}
              onChange={(value: number) => props.changeVatRate(value)}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
