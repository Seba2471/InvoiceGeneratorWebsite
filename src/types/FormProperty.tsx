import { availableRules } from '../helpers/Validation/availableValidationRules';

export type ruleObject = {
  rule: keyof availableRules;
  length?: number;
  message?: string;
};

export type FormProperty<T> = {
  value: T;
  error: string;
  showError: boolean;
  rules: Array<keyof availableRules | ruleObject>;
};
