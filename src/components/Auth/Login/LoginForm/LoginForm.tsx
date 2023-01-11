import React, { useState } from 'react';
import avatar from '../../../../assets/images/avatar.svg';
import styles from './LoginForm.module.css';
import { FormProperty } from '../../../../types/FormProperty';
import { validateRules } from '../../../../helpers/Validation/validations';
import clearFormFields from '../../../../helpers/clearFormFields';
import LoginInput from '../../../UI/Form/LoginInput/LoginInput';
import ErrorFeedback from '../../../UI/Form/ErrorFeedback';
import Spinner from '../../../UI/Spinner/Spinner';

type LoginFormTypes = {
  email: FormProperty<string>;
  password: FormProperty<string>;
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

  const clearForm = ({
    clearEmail,
    clearPassword,
  }: {
    clearEmail?: boolean;
    clearPassword?: boolean;
  }) => {
    clearFormFields<LoginFormTypes>(
      form,
      [
        { fieldName: 'email', clearValue: clearEmail || true },
        { fieldName: 'password', clearValue: clearPassword || true },
      ],
      setForm,
    );
  };

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

      if (error?.LoginFailed) {
        setLoginError('Nieprawidłowy login lub hasło');
        clearForm({ clearEmail: false });
      } else {
        setLoginError('Coś poszło nie tak... Spróbuj później');
        clearForm({});
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
    <div className={`${styles.loginContent}`}>
      <form onSubmit={submitForm}>
        <img src={avatar} alt="avatar" />
        <h2 className={`title`}>Logowanie</h2>
        <LoginInput
          placeHolder={'Email'}
          value={form.email.value}
          onChange={(value: string) => changeHandler(value, 'email')}
          error={form.email.error}
          showError={form.email.showError}
        />
        <LoginInput
          placeHolder={'Hasło'}
          type={'password'}
          value={form.password.value}
          onChange={(value: string) => changeHandler(value, 'password')}
          error={form.password.error}
          showError={form.password.showError}
        />
        <ErrorFeedback error={loginError} />
        <a className={`${styles.passUrl} mt-2`} href="/">
          Nie pamiętasz hasła?
        </a>
        {loading ? (
          <Spinner color="#38d39f" />
        ) : (
          <input type="submit" className={`${styles.btn}`} value="Login" />
        )}
        <div className={`${styles.registerUrl} mt-2`}>
          Nie masz jeszcze konta ? <br />
          <a href="/register">Zarejestruj się!</a>
        </div>
      </form>
    </div>
  );
}
