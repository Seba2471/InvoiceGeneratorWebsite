import { FormProperty } from './FormProperty';

export type RegisterFormTypes = {
  email: FormProperty<string>;
  password: FormProperty<string>;
  confirmPassword: FormProperty<string>;
};
