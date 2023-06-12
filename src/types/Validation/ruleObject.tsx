import { availableRules } from './availableRules';

export type ruleObject = {
  rule: keyof availableRules;
  length?: number;
  message?: string;
};
