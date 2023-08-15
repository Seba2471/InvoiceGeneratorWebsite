import React from 'react';
import Input from '../../UI/Form/Inputs/Input/Input';
import InputDate from '../../UI/Form/Inputs/InputDate/InputDate';
import PersonForm from './PersonForm/PersonForm';
import ButtonWithSpinner from '../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import InvoiceItemsTable from './InvoiceItemsTable/InvoiceItemsTable';
import { useDispatch, useSelector } from 'react-redux';
import { invoicesActions } from '../../../data/invoices/invoices';
import { getUiIsLoading } from '../../../data/ui/ui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import validation from '../../../validation/Forms/InvoiceForm/InvoiceFormValidation';
import { IInvoice } from '../../../types/Invoice/IInvoice';
import { InvoiceCurrency } from '../../../types/Invoice/InvoiceCurrency';
import './InvoiceForm.scss';

export default function InvoiceForm() {
  const loading = useSelector(getUiIsLoading);
  const dispatch = useDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IInvoice>({
    defaultValues: {
      invoiceNumber: '',
      soldDate: DateTime.utc().toJSDate(),
      issueDate: DateTime.utc().toJSDate(),
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
        currency: InvoiceCurrency.Zloty,
        vatRate: 23,
        values: [],
      },
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit(async (data) => await generateInvoice(data));

  const generateInvoice = async (data: IInvoice) => {
    dispatch(invoicesActions.create(data));
    reset();
  };

  return (
    <div className="invoice-form">
      <span className="invoice-form__subtitle"> Wypełnij dane faktury</span>
      <form className="invoice-form__form" onSubmit={onSubmit}>
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
    </div>
  );
}
