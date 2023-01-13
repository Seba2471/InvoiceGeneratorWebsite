import { availableRules } from '../../types/Validation/availableRules';
import { ruleObject } from '../../types/Validation/ruleObject';
import { validate } from './availableValidationRules';

export function validateRules(rules: Array<string | ruleObject>, value: any) {
  let error = '';

  rules.forEach((rule) => {
    if (rule instanceof Object) {
      const errorMessage = validate[rule.rule as keyof availableRules](value, {
        ...rule,
      });
      if (errorMessage) {
        error = errorMessage;
      }
    } else {
      const errorMessage = validate[rule as keyof availableRules](value);
      if (errorMessage) {
        error = errorMessage;
      }
    }
  });

  return error;
}
