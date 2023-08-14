import React, { useState } from 'react';
import Input from '../../UI/Form/Inputs/Input/Input';
import InputDate from '../../UI/Form/Inputs/InputDate/InputDate';
import PersonForm from './PersonForm/PersonForm';
import {
  initInvoiceFormValue,
  emptyInvoiceFormItem,
} from '../../../types/Invoice/Form/InvoiceFormInitState';
import {
  InvoiceFormItemType,
  InvoiceFormType,
} from '../../../types/Invoice/Form/InvoiceFormType';
import changeFieldValueInObject from '../../../helpers/changeFieldValueInObject';
import validateInvoiceForm from '../../../helpers/validation/validInvoiceForm';
import { validateRules } from '../../../helpers/validation/validations';
import errorNotify from '../../../helpers/notify/errorNotify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonWithSpinner from '../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import './InvoiceForm.scss';
import InvoiceItemsTable from './InvoiceItemsTable/InvoiceItemsTable';
import { useDispatch, useSelector } from 'react-redux';
import { invoicesActions } from '../../../data/invoices/invoices';
import mapInvoiceFormToInvoice from '../../../helpers/mappers/mapInvoiceFormToInvoice';
import { getUiIsLoading } from '../../../data/ui/ui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import validation from '../../../validation/Forms/InvoiceForm/InvoiceFormValidation';
import { Currency, IInvoiceFormFields } from '../../../types/Forms/InvoiceForm';

export default function InvoiceForm() {
  const [form, setForm] = useState<InvoiceFormType>(initInvoiceFormValue);
  const loading = useSelector(getUiIsLoading);
  const dispatch = useDispatch();

  const generateInvoice = async (data: IInvoiceFormFields) => {
    console.log(data);
    // const validateResult = validateInvoiceForm(form);
    // if (!validateResult.isValid) {
    //   errorNotify('Nie poprawne dane do wygenerowania faktury');
    //   setForm(validateResult.data);
    // } else {
    //   const newInvoiceData = mapInvoiceFormToInvoice(form);
    //   dispatch(invoicesActions.create(newInvoiceData));
    //   setForm({ ...initInvoiceFormValue });
    // }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IInvoiceFormFields>({
    defaultValues: {
      invoiceNumber: '',
      soldDate: DateTime.local().toJSDate(),
      issueDate: DateTime.local().toJSDate(),
      seller: {
        fullName: '',
        nip: undefined,
        address: {
          line1: '',
          line2: '',
          country: 'Polska',
        },
      },
      buyer: {
        fullName: '',
        nip: undefined,
        address: {
          line1: '',
          line2: '',
          country: 'Polska',
        },
      },
      items: {
        currency: Currency.Zloty,
        vatRate: 23,
        values: [{ name: 'test', quantity: 11, cost: 2000 }],
      },
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit(async (data) => await generateInvoice(data));

  return (
    <div className="invoice-form">
      <span className="invoice-form__subtitle"> Wypełnij dane faktury</span>
      <form className="invoice-form__form" onSubmit={onSubmit}>
        {/* <form className="invoice-form__form" onSubmit={onSubmit}> */}
        <Controller
          control={control}
          name="invoiceNumber"
          render={({ field: { onChange, value } }) => (
            <Input
              className="invoice-form__form-invoice-number"
              label="Numer faktury"
              value={value}
              error={errors.invoiceNumber?.message}
              onChange={(val: Event) => onChange(val)}
            />
          )}
        />
        <Controller
          control={control}
          name="soldDate"
          render={({ field: { onChange, value } }) => (
            <InputDate
              className="invoice-form__form-sold-date"
              label="Data sprzedaży"
              value={value}
              error={errors.soldDate?.message}
              onChange={(val: Event) => onChange(val)}
            />
          )}
        />
        <Controller
          control={control}
          name="issueDate"
          render={({ field: { onChange, value } }) => (
            <InputDate
              className="invoice-form__form-issue-date"
              label="Data wystawienia"
              value={value}
              error={errors.issueDate?.message}
              onChange={(val: Event) => onChange(val)}
            />
          )}
        />
        <hr className="invoice-form__form-line-first" />

        <Controller
          control={control}
          name="seller"
          render={({ field: { onChange, value } }) => (
            <PersonForm
              className="invoice-form__form-person-form invoice-form__form-person-form-seller"
              header="Sprzedający"
              onChange={onChange}
              value={value}
              errors={errors.seller}
            />
          )}
        />
        <Controller
          control={control}
          name="buyer"
          render={({ field: { onChange, value } }) => (
            <PersonForm
              className="invoice-form__form-person-form invoice-form__form-person-form-buyer"
              header="Nabywca"
              onChange={onChange}
              value={value}
              errors={errors.buyer}
            />
          )}
        />
        <hr className="invoice-form__form-line-three" />
        <Controller
          control={control}
          name="items"
          render={({ field: { onChange, value } }) => (
            <InvoiceItemsTable
              className="invoice-form__form-items-table"
              errors={errors.items}
              // changeItem={changeItem}
              // removeItem={removeItem}
              onChange={onChange}
              items={value}
            />
          )}
        />

        <hr className="invoice-form__form-line-four" />
        <ButtonWithSpinner
          classnameButton="invoice-form__form-submit-btn"
          classnameSpinner="invoice-form__form-spinner"
          value="Wygeneruj fakturę"
          loading={loading}
          action={() => null}
        />
      </form>
      <ToastContainer />
    </div>
  );
}
