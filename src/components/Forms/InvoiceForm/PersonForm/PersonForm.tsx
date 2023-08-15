import React, { useState, useEffect } from 'react';
import Input from '../../../UI/Form/Inputs/Input/Input';
import { FiChevronDown, FiAlertCircle } from 'react-icons/fi';
import './PersonForm.scss';
import updateProperty from '../../../../utils/updateProperty';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form/dist/types';
import { IInvoicePerson } from '../../../../types/Invoice/IInvoicePerson';

type PropsTypes = {
  className?: string;
  header: string;
  errors?: Merge<FieldError, FieldErrorsImpl<IInvoicePerson>>;
  onChange: Function;
  value: IInvoicePerson;
};

export default function PersonForm(props: PropsTypes) {
  const [showForm, setShowForm] = useState(true);
  const [showError, setShowError] = useState(false);
  const { onChange, value, errors } = props;
  const { fullName, nip, address } = value;

  useEffect(() => {
    errors?.fullName?.message ||
    errors?.nip?.message ||
    errors?.address?.line1?.message
      ? setShowError(true)
      : setShowError(false);
  }, [errors, errors?.fullName?.message, errors?.nip?.message]);
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
          <Input
            label="Imię i nazwisko"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(updateProperty(props.value, e.target.value, 'fullName'))
            }
            error={errors?.fullName?.message}
          />
          <h4 className="person-form__form-address-text">Adres</h4>
          <Input
            className="person-form__form-address-input"
            label="Linia 1"
            value={address.line1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(
                updateProperty(props.value, e.target.value, 'address.line1'),
              )
            }
            error={errors?.address?.line1?.message}
          />
          <Input
            className="person-form__form-address-input"
            label="Linia 2"
            value={address.line2 ? address.line2 : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(
                updateProperty(props.value, e.target.value, 'address.line2'),
              )
            }
            error={errors?.address?.line2?.message}
          />
          <Input
            label="NIP"
            value={nip ? nip.toString() : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(updateProperty(props.value, e.target.value, 'nip'))
            }
            error={errors?.nip?.message}
          />
        </div>
      ) : null}
    </div>
  );
}
