import React, { useState } from 'react';
import clearFormFields from '../../../../helpers/clearFormFields';
import { validateRules } from '../../../../helpers/Validation/validations';
import { FormProperty } from '../../../../types/FormProperty';
import Button from '../../../UI/Button/Button';
import ErrorFeedback from '../../../UI/Form/ErrorFeedback';
import InputEmail from '../../../UI/Form/InputEmail';
import InputPassword from '../../../UI/Form/InputPassword';
import styles from './RegisterForm.module.css';

type RegisterFormTypes = {
  email: FormProperty<string>;
  password: FormProperty<string>;
  confirmPassword: FormProperty<string>;
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
        setRegisterError('Użytkownik o takim adresie email już istnieje');
        clearForm({ clearEmail: true });
      } else {
        setRegisterError('Coś poszło nie tak... Spróbuj później');
        clearForm({ clearEmail: false });
      }
      setLoading(false);
    }
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
        value={form.confirmPassword.value}
        onChange={(value: string) => changeHandler(value, 'confirmPassword')}
        error={form.confirmPassword.error}
        showError={form.confirmPassword.showError}
      />
      <ErrorFeedback error={registerError} />
      <Button loading={loading}>Zarejestuj się</Button>
    </form>
  );
}
