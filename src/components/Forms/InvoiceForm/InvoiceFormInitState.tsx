import moment from 'moment';
import { FormProperty } from '../../../types/FormProperty';
import {
  InvoiceFormItemType,
  InvoiceFormPersonType,
  InvoiceFormType,
} from './InvoiceFormType';

const initPerson: InvoiceFormPersonType = {
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

const initString: FormProperty<string> = {
  value: '',
  error: '',
  showError: false,
  rules: ['required'],
};

const initInvoiceFormValue: InvoiceFormType = {
  invoiceNumber: initString,
  issueDate: {
    value: moment().format('YYYY-MM-DD'),
    error: '',
    showError: false,
    rules: ['required'],
  },
  soldDate: {
    value: moment().format('YYYY-MM-DD'),
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
  currency: initString,
  invoiceItems: [],
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
    rules: ['required', 'number'],
  },
  cost: {
    value: 0,
    error: '',
    showError: false,
    rules: ['required', 'number'],
  },
};

export default initInvoiceFormValue;
