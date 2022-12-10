import React, { useState } from 'react';
import InputText from '../../UI/Form/InputText';
import InputDate from '../../UI/Form/InputDate';
import PersonForm from './PersonForm/PersonForm';
import InvoiceItemsTable from './InvoiceItemsTable/InvoiceItemsTable';
import InvoiceItemsMobileTable from './InvoiceItemsMobileTable/InvoiceItemsMobileTable';
import LoadingButton from '../../UI/Button/LoadingButton';
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
import validateInvoiceForm from '../../../helpers/Validation/validInvoiceForm';
import invoiceServices from '../../../services/InvoiceServices';
import { validateRules } from '../../../helpers/Validation/validations';
import errorNotify from '../../../helpers/notify/errorNotify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successNotify from '../../../helpers/notify/successNotify';
import clearInvoiceForm from '../../../helpers/clearInvoiceForm';

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
    <div>
      <h4> Nowa faktura </h4>
      <span> Wypełnij dane faktury</span>
      <form className='mt-4' onSubmit={(e) => generateInvoice(e)}>
        <div className='row'>
          <div className='col-12 col-md-12 col-lg-4'>
            <InputText
              className='col-lg-12 col-md-4'
              label='Numer faktury'
              value={form.invoiceNumber.value}
              error={form.invoiceNumber.error}
              showError={form.invoiceNumber.showError}
              onChange={(value: string) =>
                changeInputValue(value, 'invoiceNumber')
              }
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4 mt-md-3 mt-lg-0'>
            <InputDate
              label='Data sprzedaży'
              value={form.soldDate.value}
              error={form.soldDate.error}
              showError={form.soldDate.showError}
              onChange={(value: string) => changeInputValue(value, 'soldDate')}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4 mt-md-3 mt-lg-0'>
            <InputDate
              label='Data wystawienia'
              value={form.issueDate.value}
              error={form.issueDate.error}
              showError={form.issueDate.showError}
              onChange={(value: string) => changeInputValue(value, 'issueDate')}
            />
          </div>
          <div className='col-12 col-md-5 mt-4 offset-md-1'>
            <PersonForm
              header='Sprzedający'
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
          </div>
          <div className='col-12 col-md-5 mt-4'>
            <PersonForm
              header='Nabywca'
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
          </div>
          <div className='col-md-12'>
            <div className='d-none d-md-block m-3'>
              <InvoiceItemsTable
                items={form.invoiceItems.value}
                error={form.invoiceItems.error}
                showError={form.invoiceItems.showError}
                vatRate={form.vatRate}
                currency={form.currency}
                changeItem={changeItem}
                changeCurrency={(value: string) =>
                  changeInputValue(value, 'currency')
                }
                changeVatRate={(value: string) =>
                  changeInputValue(value, 'vatRate')
                }
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>
            <div className='d-md-none'>
              <InvoiceItemsMobileTable
                items={form.invoiceItems.value}
                vatRate={form.vatRate.value}
                currency={form.currency.value}
                changeItem={changeItem}
                changeCurrency={(value: string) =>
                  changeInputValue(value, 'currency')
                }
                changeVatRate={(value: string) =>
                  changeInputValue(value, 'vatRate')
                }
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>
          </div>
        </div>
        <LoadingButton
          className='btn btn-success p-3 ps-5 pe-5 col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-0 mt-4'
          loading={loading}
        >
          Wygeneruj fakturę
        </LoadingButton>
      </form>
      <ToastContainer />
    </div>
  );
}
