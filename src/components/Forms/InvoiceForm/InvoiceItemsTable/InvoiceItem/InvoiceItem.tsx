import React from 'react';
import { FormProperty } from '../../../../../types/Forms/FormProperty';
import InputText from '../../../../UI/Form/Inputs/InputText/InputText';
import TextArea from '../../../../UI/Form/TextArea/TextArea';
import { FiX } from 'react-icons/fi';
import './InvoiceItem.scss';

type PropsTypes = {
  index: number;
  name: FormProperty<string>;
  onChange: Function;
  quantity: FormProperty<number>;
  cost: FormProperty<number>;
  onRemove: Function;
};

export default function InvoiceItem(props: PropsTypes) {
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
            value={props.name.value}
            error={props.name.error}
            showError={props.name.showError}
            onChange={(value: string) => props.onChange(value, 'name')}
          />
          <div className="invoice-item__fields-quantity-cost-box">
            <InputText
              className="invoice-item__fields-quantity"
              label="Ilość"
              type="number"
              value={props.quantity.value.toString()}
              error={props.quantity.error}
              showError={props.quantity.showError}
              onChange={(value: number) => props.onChange(value, 'quantity')}
            />

            <InputText
              className="invoice-item__fields-cost"
              label="Cena/szt."
              type="number"
              value={props.cost.value.toString()}
              error={props.cost.error}
              showError={props.cost.showError}
              onChange={(value: number) => props.onChange(value, 'cost')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
