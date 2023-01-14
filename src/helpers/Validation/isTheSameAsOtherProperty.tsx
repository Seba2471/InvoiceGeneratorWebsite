import { RegisterFormTypes } from '../../types/Forms/RegisterFormType';

function isTheSameAsOtherProperty(
  value: string,
  compareWith: keyof RegisterFormTypes,
  form: RegisterFormTypes,
) {
  if (form[compareWith].value === value) {
    return true;
  } else {
    return false;
  }
}

export default isTheSameAsOtherProperty;
