import { FormProperty } from '../../Forms/FormProperty';
import {
  InvoiceFormItemType,
  InvoiceFormPersonType,
  InvoiceFormType,
} from './InvoiceFormType';

export const initPerson: InvoiceFormPersonType = {
  fullName: {
    value: '',
    error: '',
    showError: false,
    rules: ['required'],
  },
  nip: {
    value: '',
    error: '',
    showError: false,
    rules: ['required'],
  },
  address: {
    line1: {
      value: '',
      error: '',
      showError: false,
      rules: ['required'],
    },
    line2: {
      value: '',
      error: '',
      showError: false,
      rules: ['required'],
    },
    country: {
      value: 'Polska',
      error: '',
      showError: false,
      rules: [],
    },
  },
};

export const initString: FormProperty<string> = {
  value: '',
  error: '',
  showError: false,
  rules: ['required'],
};

export const initInvoiceFormValue: InvoiceFormType = {
  invoiceNumber: initString,
  issueDate: {
    value: '',
    error: '',
    showError: false,
    rules: ['required'],
  },
  soldDate: {
    value: '',
    error: '',
    showError: false,
    rules: ['required'],
  },
  seller: initPerson,
  buyer: initPerson,
  vatRate: {
    value: 0,
    error: '',
    showError: false,
    rules: ['required'],
  },
  currency: {
    value: 'PLN',
    error: '',
    showError: false,
    rules: ['required'],
  },
  invoiceItems: {
    value: [],
    error: '',
    showError: false,
    rules: [{ rule: 'notEmptyArray', message: 'Nie dodałeś przedmiotów' }],
  },
};

export const emptyInvoiceFormItem: InvoiceFormItemType = {
  name: {
    value: '',
    error: '',
    showError: false,
    rules: ['required'],
  },
  quantity: {
    value: 1,
    error: '',
    showError: false,
    rules: ['required', 'number', 'positive'],
  },
  cost: {
    value: 0,
    error: '',
    showError: false,
    rules: ['required', 'number', 'positive'],
  },
};
