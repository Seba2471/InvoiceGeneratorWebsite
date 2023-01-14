import isTheSameAsOtherProperty from '../../../../helpers/Validation/isTheSameAsOtherProperty';
import { RegisterFormTypes } from '../../../../types/Forms/RegisterFormType';

export const comparePassword = (
  value: string,
  fieldName: keyof RegisterFormTypes,
  form: RegisterFormTypes,
  errorMessage: string,
) => {
  const fieldToCompare =
    fieldName === 'confirmPassword' ? 'password' : 'confirmPassword';
  const result = isTheSameAsOtherProperty(value, fieldToCompare, form);

  if (result) {
    return {
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: '',
      },
      [fieldToCompare]: {
        ...form[fieldToCompare],
        showError: true,
        error: '',
      },
    };
  } else {
    return {
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: errorMessage,
      },
      [fieldToCompare]: {
        ...form[fieldToCompare],
        showError: true,
        error: errorMessage,
      },
    };
  }
};
