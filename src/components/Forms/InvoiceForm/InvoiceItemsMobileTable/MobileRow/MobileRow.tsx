import React from 'react';
import InputText from '../../../../UI/Form/InputText';

type PropsType = {
  index: number;
  cost: number;
  name: string;
  quantity: number;
  onChange: Function;
  onRemove: Function;
};

export default function MobileRow(props: PropsType) {
  return (
    <div className='row mt-3 border p-1 pb-3 pt-1'>
      <div className='col-1 offset-10'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-x-lg'
          style={{ color: 'red' }}
          onClick={() => props.onRemove(props.index)}
          viewBox='0 0 16 16'
        >
          <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
        </svg>
      </div>
      <div className='col-12'>{props.index + 1}. Nazwa towaru/usługi </div>
      <div className='col-12'>
        <InputText
          label=''
          value={props.name}
          onChange={(value: string) => props.onChange(value, 'name')}
        />
      </div>
      <div className='col-4 mt-2'>
        <InputText
          label='Ilość'
          value={props.quantity.toString()}
          onChange={(value: number) => props.onChange(value, 'quantity')}
        />
      </div>
      <div className='col-8 mt-2'>
        <InputText
          label='Cena netto'
          value={props.cost.toString()}
          onChange={(value: number) => props.onChange(value, 'cost')}
        />
      </div>
    </div>
  );
}
