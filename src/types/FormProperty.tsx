import { availableRules } from '../helpers/Validation/availableValidationRules';

export type FormProperty = {
  value: string;
  error: string;
  showError: boolean;
  rules: Array<keyof availableRules>;
};
