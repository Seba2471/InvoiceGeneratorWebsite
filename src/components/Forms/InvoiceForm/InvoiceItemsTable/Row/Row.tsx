import React from 'react';
import InputText from '../../../../UI/Form/InputText';

export default function Row(props: any) {
  return (
    <tr>
      <th className='d-none' scope='col'>
        LP
      </th>
      <th scope='col'>{props.index + 1}</th>
      <th scope='col'>
        <InputText
          label=''
          value={props.name}
          onChange={(value: string) => props.onChange(value, 'name')}
        />
      </th>
      <th scope='col'>
        <InputText
          label=''
          type='number'
          value={props.quantity}
          onChange={(value: number) => props.onChange(value, 'quantity')}
        />
      </th>
      <th scope='col'>
        <InputText
          label=''
          type='number'
          value={props.cost}
          onChange={(value: number) => props.onChange(value, 'cost')}
        />
      </th>
    </tr>
  );
}
