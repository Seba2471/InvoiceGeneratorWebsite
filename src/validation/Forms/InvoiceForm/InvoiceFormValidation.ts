import * as yup from 'yup';
import { Currency } from '../../../types/Forms/InvoiceForm';

const personValidation = yup.object().shape({
  fullName: yup.string().required('Pole wymagane'),
  nip: yup.number().required('Pole wymagane'),
  address: yup.object().shape({
    line1: yup.string().required('Pole wymagane'),
    line2: yup.string(),
    country: yup.string().required('Pole wymagane'),
  }),
});

const itemValueValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nazwa musi składać się z co najmniej 3 znaków')
    .required('Pole wymagane'),
  quantity: yup
    .number()
    .integer()
    .moreThan(-1, 'Liczba przedmiotów musi być większa od zera')
    .required('Pole wymagane'),
  cost: yup
    .number()
    .moreThan(-1, 'Liczba przedmiotów musi być większa od zera')
    .required('Pole wymagane'),
});

const itemsValidation = yup.object().shape({
  currency: yup
    .string()
    .oneOf(Object.values(Currency))
    .required('Pole wymagane'),
  vatRate: yup.number().required('Pole wymagane'),
  values: yup.array(itemValueValidation).required('Pole wymagane'),
});

const schema = yup
  .object({
    invoiceNumber: yup.string().required('Pole wymagane'),
    soldDate: yup.date().required('Pole wymagane'),
    issueDate: yup.date().required('Pole wymagane'),
    seller: personValidation,
    buyer: personValidation,
    items: itemsValidation,
  })
  .required();

export default schema;
