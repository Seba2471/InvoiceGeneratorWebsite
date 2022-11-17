import React, { useState } from 'react';
import { validateRules } from '../../../../helpers/Validation/validations';
import { FormProperty } from '../../../../types/FormProperty';
import Button from '../../../UI/Button/Button';
import InputEmail from '../../../UI/Form/InputEmail';
import InputPassword from '../../../UI/Form/InputPassword';
import styles from './RegisterForm.module.css';

type RegisterFormTypes = {
  email: FormProperty;
  password: FormProperty;
  replyPassword: FormProperty;
};

export default function RegisterForm(props: { onRegister: Function }) {
  const [form, setForm] = useState<RegisterFormTypes>({
    email: {
      value: '',
      error: '',
      showError: false,
      rules: ['email', 'required'],
    },
    password: {
      value: '',
      error: '',
      showError: false,
      rules: ['required'],
    },
    replyPassword: {
      value: '',
      error: '',
      showError: false,
      rules: ['required'],
    },
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    props.onRegister({
      email: form.email.value,
      password: form.password.value,
    });
  };

  const changeHandler = (value: string, fieldName: keyof RegisterFormTypes) => {
    const errorMessage = validateRules(form[fieldName].rules, value);

    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: errorMessage,
      },
    });
  };

  return (
    <form className='main' onSubmit={(e) => submitForm(e)}>
      <h1 className={`text-center ${styles.header}`}>Rejestracja </h1>
      <InputEmail
        placeHolder='Email'
        value={form.email.value}
        onChange={(value: string) => changeHandler(value, 'email')}
        error={form.email.error}
        showError={form.email.showError}
      />
      <InputPassword
        placeHolder='Hasło'
        value={form.password.value}
        onChange={(value: string) => changeHandler(value, 'password')}
        error={form.password.error}
        showError={form.password.showError}
      />
      <InputPassword
        placeHolder='Powtórz hasło'
        value={form.replyPassword.value}
        onChange={(value: string) => changeHandler(value, 'replyPassword')}
        error={form.replyPassword.error}
        showError={form.replyPassword.showError}
      />
      <Button>Zarejestuj się</Button>
    </form>
  );
}
