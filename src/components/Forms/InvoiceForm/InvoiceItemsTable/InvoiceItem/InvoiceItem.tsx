import React from 'react';
import InputText from '../../../../UI/Form/Inputs/Input/Input';
import TextArea from '../../../../UI/Form/TextArea/TextArea';
import { FiX } from 'react-icons/fi';
import './InvoiceItem.scss';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { IInvoiceItemsValues } from '../../../../../types/Invoice/IInvoiceItem';

type PropsTypes = {
  index: number;
  name: string;
  onChange: Function;
  quantity: number;
  cost: number;
  onRemove: Function;
  errors?: Merge<FieldError, FieldErrorsImpl<IInvoiceItemsValues>>;
};

export default function InvoiceItem(props: PropsTypes) {
  const { cost, name, quantity, errors } = props;
  return (
    <div className="invoice-item">
      <div className="invoice-item__fields-wrapper">
        <div className="invoice-item__number-box">
          <h4 className="invoice-item__number"> {props.index + 1} </h4>
        </div>
        <div className="invoice-item__fields">
          <div className="invoice-item__fields-delete-icon">
            <FiX onClick={() => props.onRemove()} />
          </div>
          <TextArea
            className="invoice-item__fields-textarea"
            label="Nazwa"
            value={name}
            error={errors?.name?.message}
            onChange={(value: string) => props.onChange(value, 'name')}
          />
          <div className="invoice-item__fields-quantity-cost-box">
            <InputText
              className="invoice-item__fields-quantity"
              label="Ilość"
              type="number"
              value={quantity.toString()}
              error={errors?.quantity?.message}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                props.onChange(value.target.value, 'quantity')
              }
            />

            <InputText
              className="invoice-item__fields-cost"
              label="Cena/szt."
              type="number"
              value={cost.toString()}
              error={errors?.cost?.message}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                props.onChange(value.target.value, 'cost')
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
