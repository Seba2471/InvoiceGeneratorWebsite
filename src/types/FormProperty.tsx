import { availableRules } from '../helpers/Validation/availableValidationRules';

export type ruleObject = {
  rule: keyof availableRules;
  length?: number;
};

export type FormProperty = {
  value: string;
  error: string;
  showError: boolean;
  rules: Array<keyof availableRules | ruleObject>;
};
