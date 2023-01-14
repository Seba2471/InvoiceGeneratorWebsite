import React from 'react';
import { FormProperty } from '../../../../../types/Forms/FormProperty';
import InputText from '../../../../UI/Form/InputText';

type PropsTypes = {
  index: number;
  name: FormProperty<string>;
  onChange: Function;
  quantity: FormProperty<number>;
  cost: FormProperty<number>;
  onRemove: Function;
};

export default function Row(props: PropsTypes) {
  return (
    <tr>
      <th className="d-none" scope="col">
        LP
      </th>
      <th scope="col" className="align-middle">
        {props.index + 1}
      </th>
      <th scope="col">
        <InputText
          label=""
          value={props.name.value}
          error={props.name.error}
          showError={props.name.showError}
          onChange={(value: string) => props.onChange(value, 'name')}
        />
      </th>
      <th scope="col">
        <InputText
          label=""
          type="number"
          value={props.quantity.value.toString()}
          error={props.quantity.error}
          showError={props.quantity.showError}
          onChange={(value: number) => props.onChange(value, 'quantity')}
        />
      </th>
      <th scope="col">
        <InputText
          label=""
          type="number"
          value={props.cost.value.toString()}
          error={props.cost.error}
          showError={props.cost.showError}
          onChange={(value: number) => props.onChange(value, 'cost')}
        />
      </th>
      <th className="align-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          style={{ color: 'red' }}
          onClick={() => props.onRemove(props.index)}
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </th>
    </tr>
  );
}
