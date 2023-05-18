import React, { useState } from 'react';
import { validateRules } from '../../../helpers/validation/validations';
import { FormProperty } from '../../../types/Forms/FormProperty';
import SuccessAlert from '../../UI/Alerts/SuccessAlert';
import LoginInput from '../../UI/Form/AuthInput/AuthInput';
import Spinner from '../../UI/Spinner/Spinner';
import styles from './RestartPasswordForm.module.css';
import avatar from '../../../assets/images/avatar.svg';
import ErrorAlert from '../../UI/Alerts/ErrorAlert';

export default function RestartPasswordForm(props: { onRestart: Function }) {
  const [email, setEmail] = useState<FormProperty<string>>({
    value: '',
    error: '',
    showError: false,
    rules: ['email', 'required'],
  });

  const [loading, setLoading] = useState(false);
  const [successRestart, setSuccessRestart] = useState(false);
  const [errorRestart, setErrorRestart] = useState(false);

  const restartPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errorMessage = validateRules(email.rules, email.value);

    if (errorMessage) {
      setEmail({
        ...email,
        showError: true,
        error: errorMessage,
      });
    } else {
      setLoading(true);
      const result = await props.onRestart(email.value);
      setLoading(false);
      if (result) {
        setSuccessRestart(true);
      } else {
        setErrorRestart(true);
      }
    }
  };

  const changeHandler = (value: string) => {
    const errorMessage = validateRules(email.rules, value);
    setEmail({
      ...email,
      value,
      showError: true,
      error: errorMessage,
    });
  };

  // const btn = loading ? (
  //   <Spinner className="mt-3" color="#38d39f" />
  // ) : (
  //   <input type="submit" className={`${styles.btn}`} value="Odzyskaj hasło" />
  // );
  const btn = (
    <input type="submit" className={`${styles.btn}`} value="Odzyskaj hasło" />
  );

  const form = (
    <LoginInput
      placeHolder={'Email'}
      value={email.value}
      onChange={(value: string) => {
        changeHandler(value);
      }}
      error={email.error}
      showError={email.showError}
    />
  );

  return (
    <div className={`${styles.loginContent}`}>
      <form onSubmit={(e: React.SyntheticEvent) => restartPassword(e)}>
        <img src={avatar} alt="avatar" />
        <h2>Zapomniałeś hasła ?</h2>
        {successRestart || errorRestart ? (
          successRestart ? (
            <SuccessAlert
              message={`Sukces! Link do zmiany hasła został wysłany na twój adres ${email.value}`}
            />
          ) : (
            <ErrorAlert
              error={`Coś poszło nie tak! Spróbuj ponownie później!`}
            />
          )
        ) : (
          <div>
            {form} {btn}
          </div>
        )}
        <div className={`${styles.registerUrl} mt-2`}>
          Wróc do strony <a href="/login">logowania!</a>
        </div>
      </form>
    </div>
  );
}
