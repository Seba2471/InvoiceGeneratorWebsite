import React, { useState, useEffect } from 'react';
import { FormProperty } from '../../../../types/Forms/FormProperty';
import InputText from '../../../UI/Form/Inputs/InputText/InputText';
import { FiChevronDown, FiAlertCircle } from 'react-icons/fi';
import './PersonForm.scss';

type PropsTypes = {
  className?: string;
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
  const [showForm, setShowForm] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    props.fullName.error !== '' ||
    props.line1.error !== '' ||
    props.line2.error !== '' ||
    props.nip.error !== ''
      ? setShowError(true)
      : setShowError(false);
  }, [
    props.fullName.error,
    props.nip.error,
    props.line1.error,
    props.line2.error,
  ]);

  return (
    <div className={`person-form ${props.className}`}>
      <div className="person-form__header">
        <h3
          className={`person-form__title ${
            showError ? 'person-form__title--error' : ''
          } `}
        >
          {props.header}
          {showError ? (
            <FiAlertCircle className="person-form__title-error-icon" />
          ) : null}
        </h3>

        <FiChevronDown
          className={`person-form__icon  ${
            showForm ? '' : 'person-form--collapsed'
          }`}
          onClick={() => setShowForm(!showForm)}
        />
      </div>
      {showForm ? (
        <div className="person-form__form">
          <InputText
            label="Imię i nazwisko"
            value={props.fullName.value}
            error={props.fullName.error}
            showError={props.fullName.showError}
            onChange={(e: string) => props.onChangeFullName(e)}
          />
          <h4 className="person-form__form-address-text">Adres</h4>
          <InputText
            className="person-form__form-address-input"
            label="Linia 1"
            value={props.line1.value}
            error={props.line1.error}
            showError={props.line1.showError}
            onChange={(e: string) => props.onChangeAddresLine1(e)}
          />
          <InputText
            className="person-form__form-address-input"
            label="Linia 2"
            value={props.line2.value}
            error={props.line2.error}
            showError={props.line2.showError}
            onChange={(e: string) => props.onChangeAddresLine2(e)}
          />
          <InputText
            label="NIP"
            value={props.nip.value}
            error={props.nip.error}
            showError={props.nip.showError}
            onChange={(e: string) => props.onChangeNip(e)}
          />
        </div>
      ) : null}
    </div>
  );
}
