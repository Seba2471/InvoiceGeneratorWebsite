import React, { useState } from 'react';
import InputText from '../../UI/Form/Inputs/InputText/InputText';
import InputDate from '../../UI/Form/Inputs/InputDate/InputDate';
import PersonForm from './PersonForm/PersonForm';
import {
  initInvoiceFormValue,
  emptyInvoiceFormItem,
} from '../../../types/Invoice/Form/InvoiceFormInitState';
import {
  InvoiceFormItemType,
  InvoiceFormPersonAddresType,
  InvoiceFormPersonType,
  InvoiceFormType,
} from '../../../types/Invoice/Form/InvoiceFormType';
import changeFieldValueInObject from '../../../helpers/changeFieldValueInObject';
import validateInvoiceForm from '../../../helpers/validation/validInvoiceForm';
import invoiceServices from '../../../services/InvoiceServices';
import { validateRules } from '../../../helpers/validation/validations';
import errorNotify from '../../../helpers/notify/errorNotify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successNotify from '../../../helpers/notify/successNotify';
import clearInvoiceForm from '../../../helpers/clearInvoiceForm';
import ButtonWithSpinner from '../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import './InvoiceForm.scss';
import InvoiceItemsTable from './InvoiceItemsTable/InvoiceItemsTable';

export default function InvoiceForm() {
  const [form, setForm] = useState<InvoiceFormType>(initInvoiceFormValue);
  const [loading, setLoading] = useState(false);

  const changeItem = (
    value: string,
    index: number,
    key: keyof InvoiceFormItemType,
  ) => {
    const error = validateRules(
      form.invoiceItems.rules,
      form.invoiceItems.value,
    );

    let newItems = [...form.invoiceItems.value];

    let item = form.invoiceItems.value[index];

    const newItem = changeFieldValueInObject(item, value, key);

    newItems[index] = newItem;

    setForm({
      ...form,
      invoiceItems: {
        ...form.invoiceItems,
        value: newItems,
        error,
        showError: true,
      },
    });
  };

  const addItem = (e: Event) => {
    if (e) {
      e.preventDefault();
    }

    const newArray = [...form.invoiceItems.value, emptyInvoiceFormItem];

    const error = validateRules(form.invoiceItems.rules, newArray);
    setForm({
      ...form,
      invoiceItems: {
        ...form.invoiceItems,
        value: newArray,
        error,
        showError: true,
      },
    });
  };

  const removeItem = (index: number) => {
    const newArray = [...form.invoiceItems.value];
    newArray.splice(index, 1);
    setForm({
      ...form,
      invoiceItems: {
        ...form.invoiceItems,
        value: newArray,
      },
    });
  };

  const generateInvoice = async (e: any) => {
    e.preventDefault();
    const validateResult = validateInvoiceForm(form);
    if (!validateResult.isValid) {
      errorNotify('Nie poprawne dane do wygenerowania faktury');
      setForm(validateResult.data);
    } else {
      setLoading(true);
      const successGenerate = await invoiceServices.generateInvoice(form);
      setLoading(false);
      if (successGenerate) {
        successNotify('Faktura została wygenerowana');
        console.log(clearInvoiceForm());
        setForm({ ...initInvoiceFormValue });
      } else {
        errorNotify(
          'Nie udało się wygenerować faktury. Spróbuj ponownie poźniej.',
        );
      }
    }
  };

  const changeInputValue = (
    value: string | number,
    fieldName: keyof InvoiceFormType,
  ) => {
    const newForm = changeFieldValueInObject(form, value, fieldName);
    setForm(newForm);
  };

  const changePersonValue = (
    value: string,
    fieldName: 'buyer' | 'seller',
    personFieldName: keyof InvoiceFormPersonType,
  ) => {
    const newPerson = changeFieldValueInObject(
      form[fieldName],
      value,
      personFieldName,
    );
    setForm({
      ...form,
      [fieldName]: { ...newPerson },
    });
  };

  const changePersonAdresValue = (
    value: string,
    fieldName: 'buyer' | 'seller',
    addressFieldName: keyof InvoiceFormPersonAddresType,
  ) => {
    const newAddress = changeFieldValueInObject(
      form[fieldName].address,
      value,
      addressFieldName,
    );
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        address: newAddress,
      },
    });
  };

  return (
    <div className="invoice-form">
      <h2 className="invoice-form__title">Nowa faktura</h2>
      <span className="invoice-form__subtitle"> Wypełnij dane faktury</span>
      <form className="invoice-form__form" onSubmit={(e) => generateInvoice(e)}>
        <InputText
          className="invoice-form__form-invoice-number"
          label="Numer faktury"
          value={form.invoiceNumber.value}
          error={form.invoiceNumber.error}
          showError={form.invoiceNumber.showError}
          onChange={(value: string) => changeInputValue(value, 'invoiceNumber')}
        />
        <InputDate
          className="invoice-form__form-sold-date"
          label="Data sprzedaży"
          value={form.soldDate.value}
          error={form.soldDate.error}
          showError={form.soldDate.showError}
          onChange={(value: string) => changeInputValue(value, 'soldDate')}
        />
        <InputDate
          className="invoice-form__form-issue-date"
          label="Data wystawienia"
          value={form.issueDate.value}
          error={form.issueDate.error}
          showError={form.issueDate.showError}
          onChange={(value: string) => changeInputValue(value, 'issueDate')}
        />
        <hr className="invoice-form__form-line-first" />
        <PersonForm
          className="invoice-form__form-person-form invoice-form__form-person-form-seller"
          header="Sprzedający"
          fullName={form.seller.fullName}
          nip={form.seller.nip}
          line1={form.seller.address.line1}
          line2={form.seller.address.line2}
          onChangeFullName={(value: string) =>
            changePersonValue(value, 'seller', 'fullName')
          }
          onChangeAddresLine1={(value: string) =>
            changePersonAdresValue(value, 'seller', 'line1')
          }
          onChangeAddresLine2={(value: string) =>
            changePersonAdresValue(value, 'seller', 'line2')
          }
          onChangeNip={(value: string) =>
            changePersonValue(value, 'seller', 'nip')
          }
        />
        <hr className="invoice-form__form-line-secondary" />
        <PersonForm
          className="invoice-form__form-person-form invoice-form__form-person-form-buyer"
          header="Nabywca"
          fullName={form.buyer.fullName}
          nip={form.buyer.nip}
          line1={form.buyer.address.line1}
          line2={form.buyer.address.line2}
          onChangeFullName={(value: string) =>
            changePersonValue(value, 'buyer', 'fullName')
          }
          onChangeAddresLine1={(value: string) =>
            changePersonAdresValue(value, 'buyer', 'line1')
          }
          onChangeAddresLine2={(value: string) =>
            changePersonAdresValue(value, 'buyer', 'line2')
          }
          onChangeNip={(value: string) =>
            changePersonValue(value, 'buyer', 'nip')
          }
        />
        <hr className="invoice-form__form-line-three" />
        <InvoiceItemsTable
          className="invoice-form__form-items-table"
          items={form.invoiceItems.value}
          error={form.invoiceItems.error}
          showError={form.invoiceItems.showError}
          vatRate={form.vatRate}
          currency={form.currency}
          changeItem={changeItem}
          changeCurrency={(value: string) =>
            changeInputValue(value, 'currency')
          }
          changeVatRate={(value: string) => changeInputValue(value, 'vatRate')}
          addItem={addItem}
          removeItem={removeItem}
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
