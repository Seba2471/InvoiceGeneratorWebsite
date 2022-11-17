import { validate, availableRules } from './availableValidationRules';

export function validateRules(rules: Array<string>, value: any) {
  let error = '';

  rules.forEach((rule) => {
    const errorMessage = validate[rule as keyof availableRules](value);
    if (errorMessage) {
      error = errorMessage;
    }
  });

  return error;
}
