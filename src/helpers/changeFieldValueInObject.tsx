import { FormProperty } from '../types/FormProperty';
import { validateRules } from './Validation/validations';

function changeFieldValueInObject<T>(
  form: T,
  value: string | number,
  fieldName: keyof T,
) {
  const field = form[fieldName] as FormProperty<string | number>;
  const errorMessage = validateRules(field.rules, value);

  return {
    ...form,
    [fieldName]: {
      ...form[fieldName],
      value,
      showError: true,
      error: errorMessage,
    },
  };
}

export default changeFieldValueInObject;
