import React from 'react';
import InputText from '../../../UI/Form/InputText';

type PropsTypes = {
  header: string;
  fullName: string;
  onChangeFullName: Function;
  line1: string;
  line2: string;
  onChangeAddresLine1: Function;
  onChangeAddresLine2: Function;
  nip: string;
  onChangeNip: Function;
};

export default function PersonForm(props: PropsTypes) {
  return (
    <div>
      <h5> {props.header} </h5>
      <InputText
        label='Imię i nazwisko'
        value={props.fullName}
        onChange={(e: string) => props.onChangeFullName(e)}
      />
      <InputText
        label='Linia 1'
        value={props.line1}
        onChange={(e: string) => props.onChangeAddresLine1(e)}
      />
      <InputText
        label='Linia 2'
        value={props.line2}
        onChange={(e: string) => props.onChangeAddresLine2(e)}
      />
      <InputText
        label='NIP'
        value={props.nip}
        onChange={(e: string) => props.onChangeNip(e)}
      />
    </div>
  );
}
