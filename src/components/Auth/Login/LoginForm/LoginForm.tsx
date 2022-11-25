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
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      email: validateRules(form.email.rules, form.email.value),
      password: validateRules(form.password.rules, form.password.value),
    };

    if (errors.email !== '' || errors.password !== '') {
      setForm({
        ...form,
        email: { ...form.email, error: errors.email, showError: true },
        password: { ...form.password, error: errors.password, showError: true },
      });
    } else {
      setLoading(true);
      const error = await props.onLogin(form.email.value, form.password.value);
      setLoading(false);

      if (error) {
        setForm({
          email: { ...form.email, error: '', showError: false },
          password: {
            ...form.password,
            value: '',
            error: '',
            showError: false,
          },
        });
      }
      if (error.LoginFailed) {
        setLoginError('Nieprawidłowy login lub hasło');
      } else {
        setLoginError('Coś poszło nie tak... Spróbuj później');
      }
    }
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
      <input className={`d-none ${loginError ? 'is-invalid' : ''}`} />
      <div id='loginErrorsFeedback' className='invalid-feedback'>
        {loginError}
      </div>
      <div className='mt-2 ms-2'>Zapomniałem hasła</div>
      <Button loading={loading}>Zaloguj się</Button>
    </form>
  );
}
