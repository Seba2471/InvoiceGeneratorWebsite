import { availableRules } from '../Validation/availableRules';
import { ruleObject } from '../Validation/ruleObject';

export type FormProperty<T> = {
  value: T;
  error: string;
  showError: boolean;
  rules: Array<keyof availableRules | ruleObject>;
};
