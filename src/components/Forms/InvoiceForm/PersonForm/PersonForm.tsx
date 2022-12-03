import React from 'react';
import { FormProperty } from '../../../../types/FormProperty';
import InputText from '../../../UI/Form/InputText';

type PropsTypes = {
  header: string;
  fullName: FormProperty<string>;
  onChangeFullName: Function;
  line1: FormProperty<string>;
  line2: FormProperty<string>;
  onChangeAddresLine1: Function;
  onChangeAddresLine2: Function;
  nip: FormProperty<string>;
  onChangeNip: Function;
};

export default function PersonForm(props: PropsTypes) {
  return (
    <div>
      <h5> {props.header} </h5>
      <InputText
        label='Imię i nazwisko'
        value={props.fullName.value}
        error={props.fullName.error}
        showError={props.fullName.showError}
        onChange={(e: string) => props.onChangeFullName(e)}
      />
      <InputText
        label='Linia 1'
        value={props.line1.value}
        error={props.line1.error}
        showError={props.line1.showError}
        onChange={(e: string) => props.onChangeAddresLine1(e)}
      />
      <InputText
        label='Linia 2'
        value={props.line2.value}
        error={props.line2.error}
        showError={props.line2.showError}
        onChange={(e: string) => props.onChangeAddresLine2(e)}
      />
      <InputText
        label='NIP'
        value={props.nip.value}
        error={props.nip.error}
        showError={props.nip.showError}
        onChange={(e: string) => props.onChangeNip(e)}
      />
    </div>
  );
}
