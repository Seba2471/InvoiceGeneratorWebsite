import {
  InvoiceFormType,
  InvoiceFormPersonType,
  InvoiceFormItemType,
} from '../../types/Invoice/Form/InvoiceFormType';
import { validateRules } from './validations';
import { FormProperty } from '../../types/Forms/FormProperty';

function validatedObjectFormPropertyType<T extends Object>(data: T) {
  const newData = { ...data };
  const keys = Object.keys(newData);
  let isValid = true;
  keys.map((key) => {
    const keyValue = key as keyof T;
    const field = newData[keyValue];
    if (
      typeof field === 'object' &&
      field !== null &&
      field.hasOwnProperty('rules')
    ) {
      const field = newData[keyValue] as FormProperty<string | number>;

      const error = validateRules(field.rules, field.value);

      if (error) {
        isValid = false;
        field.error = error;
        field.showError = true;
      }
    }

    return key;
  });

  return { isValid, data: newData };
}

function validInvoicePerson(data: InvoiceFormPersonType) {
  const dataValid = validatedObjectFormPropertyType(data);
  const addressValid = validatedObjectFormPropertyType(dataValid.data.address);

  return {
    isValid: dataValid.isValid && addressValid.isValid,
    data: { ...dataValid.data, address: addressValid.data },
  };
}

function validInvoiceItems(data: FormProperty<Array<InvoiceFormItemType>>) {
  const items = data.value;
  let isValid = true;
  let validateItems: Array<InvoiceFormItemType> = [];

  items.forEach((item) => {
    const validItem = validatedObjectFormPropertyType(item);
    if (!validItem) {
      isValid = false;
    }
    validateItems = [...validateItems, validItem.data];
  });

  return {
    isValid,
    data: { ...data, value: validateItems },
  };
}

function validateInvoiceForm(data: InvoiceFormType) {
  const dataValid = validatedObjectFormPropertyType(data);
  const buyerValid = validInvoicePerson(dataValid.data.buyer);
  const sellerValid = validInvoicePerson(dataValid.data.seller);
  const itemsValid = validInvoiceItems(dataValid.data.invoiceItems);

  const result: { isValid: boolean; data: InvoiceFormType } = {
    isValid:
      dataValid.isValid &&
      buyerValid.isValid &&
      sellerValid.isValid &&
      itemsValid.isValid,
    data: {
      ...dataValid.data,
      seller: sellerValid.data,
      buyer: buyerValid.data,
      invoiceItems: itemsValid.data,
    },
  };

  return result;
}

export default validateInvoiceForm;
