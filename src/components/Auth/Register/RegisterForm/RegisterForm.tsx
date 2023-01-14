import React, { useState } from 'react';
import avatar from '../../../../assets/images/avatar.svg';
import styles from './RegisterForm.module.css';
import { validateRules } from '../../../../helpers/validation/validations';
import clearFormFields from '../../../../helpers/clearFormFields';
import LoginInput from '../../../UI/Form/LoginInput/LoginInput';
import ErrorFeedback from '../../../UI/Form/ErrorFeedback';
import Spinner from '../../../UI/Spinner/Spinner';
import { RegisterFormTypes } from '../../../../types/Forms/RegisterFormType';
import { comparePassword } from './RegisterFormHelpers';

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
      rules: ['required', { rule: 'min', length: 6 }],
    },
    confirmPassword: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 6 }],
    },
  });
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const clearForm = ({
    clearEmail,
    clearPassword,
  }: {
    clearEmail?: boolean;
    clearPassword?: boolean;
  }) => {
    clearFormFields<RegisterFormTypes>(
      form,
      [
        { fieldName: 'email', clearValue: clearEmail || true },
        { fieldName: 'password', clearValue: clearPassword || true },
        { fieldName: 'confirmPassword', clearValue: clearPassword || true },
      ],
      setForm,
    );
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors = false;
    const formKeys = Object.keys(form);

    const newForm = { ...form };

    formKeys.forEach((key) => {
      const validResponse = validateRules(
        form[key as keyof RegisterFormTypes].rules,
        form[key as keyof RegisterFormTypes].value,
      );

      if (validResponse !== '') {
        errors = true;
      }
      newForm[key as keyof RegisterFormTypes].error = validResponse;
      newForm[key as keyof RegisterFormTypes].showError = true;
    });

    setForm(newForm);

    if (!errors) {
      setLoading(true);
      const error = await props.onRegister(
        form.email.value,
        form.password.value,
        form.confirmPassword.value,
      );
      if (error.DuplicateUserName) {
        setRegisterError('Taki użytkownik już istnieje!');
        clearForm({ clearEmail: true });
      } else {
        setRegisterError('Coś poszło nie tak... Spróbuj później');
        clearForm({ clearEmail: false });
      }
      setLoading(false);
    }
  };

  const changeHandler = (value: string, fieldName: keyof RegisterFormTypes) => {
    const notTheSamePasswordMessage = 'Podane hasła muszą być takie same';

    if (
      (fieldName === 'confirmPassword' && value.length >= 6) ||
      (fieldName === 'password' && value.length >= 6)
    ) {
      const newForm = comparePassword(
        value,
        fieldName,
        form,
        notTheSamePasswordMessage,
      );

      if (newForm) {
        setForm(newForm);
        return;
      }
    }
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
        <h2 className={`title`}>Rejestracja</h2>
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
        <LoginInput
          placeHolder={'Powtórz hasło'}
          type={'password'}
          value={form.confirmPassword.value}
          onChange={(value: string) => changeHandler(value, 'confirmPassword')}
          error={form.confirmPassword.error}
          showError={form.confirmPassword.showError}
        />
        <ErrorFeedback
          className="mt-3"
          textAlign="center"
          fontSize="1.2rem"
          error={registerError}
        />
        {loading ? (
          <Spinner color="#38d39f" />
        ) : (
          <input type="submit" className={`${styles.btn}`} value="Zarejestuj" />
        )}
        <div className={`${styles.loginUrl} mt-2`}>
          Masz już konto ? <br />
          <a href="/login">Zaloguj się!</a>
        </div>
      </form>
    </div>
  );
}
