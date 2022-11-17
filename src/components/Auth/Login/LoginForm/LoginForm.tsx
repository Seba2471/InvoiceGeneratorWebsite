import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import InputEmail from '../../../UI/Form/InputEmail';
import InputPassword from '../../../UI/Form/InputPassword';
import Button from '../../../UI/Button/Button';
import { validateRules } from '../../../../helpers/Validation/validations';
import { FormProperty } from '../../../../types/FormProperty';

type LoginFormTypes = {
  email: FormProperty;
  password: FormProperty;
};

export default function LoginForm(props: { onLogin: Function }) {
  const [form, setForm] = useState<LoginFormTypes>({
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
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    props.onLogin(form);
  };

  const changeHandler = (value: string, fieldName: keyof LoginFormTypes) => {
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
      <h1 className={`text-center ${styles.header}`}> Logowanie </h1>
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
      <div className='mt-2 ms-2'>Zapomniałem hasła</div>
      <Button>Zaloguj się</Button>
    </form>
  );
}
