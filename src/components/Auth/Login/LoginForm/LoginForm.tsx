import React, { useState } from 'react';
import { FormProperty } from '../../../../types/Forms/FormProperty';
import { validateRules } from '../../../../helpers/validation/validations';
import clearFormFields from '../../../../helpers/clearFormFields';
import LoginInput from '../../../UI/Form/AuthInput/AuthInput';
import ErrorFeedback from '../../../UI/Form/ErrorFeedback/ErrorFeedback';
import { useNavigate } from 'react-router-dom';
import Underline from '../../Shared/Underline/Underline';
import './LoginForm.scss';
import ButtonWithSpinner from '../../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import Button from '../../../UI/Buttons/Button/Button';
import Title from '../../Shared/Title/Title';

type LoginFormTypes = {
  email: FormProperty<string>;
  password: FormProperty<string>;
};

export default function LoginForm(props: { onLogin: Function }) {
  const navigate = useNavigate();

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
    setLoginError('');
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
    <div className="login-form">
      <Title title="Logowanie" />
      <form className="login-form__form" onSubmit={submitForm}>
        <LoginInput
          className="login-form__input-group"
          inputClassName="login-form__input"
          placeHolder={'Email'}
          value={form.email.value}
          onChange={(value: string) => changeHandler(value, 'email')}
          error={form.email.error}
          showError={form.email.showError}
        />
        <LoginInput
          className="login-form__input-group"
          inputClassName="login-form__input"
          placeHolder={'Hasło'}
          type={'password'}
          value={form.password.value}
          onChange={(value: string) => changeHandler(value, 'password')}
          error={form.password.error}
          showError={form.password.showError}
        />
        <ErrorFeedback error={loginError} />
        <a
          className="login-form__link login-form__restart-password-link"
          href="/password_restart"
        >
          Nie pamiętasz hasła?
        </a>
        <ButtonWithSpinner
          value="Zaloguj"
          loading={loading}
          action={() => null}
        />
      </form>
      <Underline />
      <p className="login-form__register-text">Nie masz jeszcze konta ?</p>
      <Button value="Zarejestruj się" action={() => navigate('/register')} />
    </div>
  );
}
