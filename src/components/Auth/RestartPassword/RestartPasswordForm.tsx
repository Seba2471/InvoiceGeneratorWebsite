import React, { useState } from 'react';
import { validateRules } from '../../../helpers/validation/validations';
import { FormProperty } from '../../../types/Forms/FormProperty';
import SuccessAlert from '../../UI/Alerts/SuccessAlert';
import LoginInput from '../../UI/Form/AuthInput/AuthInput';
import ErrorAlert from '../../UI/Alerts/ErrorAlert';
import Title from '../Title/Title';
import ButtonWithSpinner from '../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import Underline from '../Underline/Underline';
import Button from '../../UI/Buttons/Button/Button';
import { useNavigate } from 'react-router-dom';
import './RestartPassword.scss';

export default function RestartPasswordForm(props: { onRestart: Function }) {
  const [email, setEmail] = useState<FormProperty<string>>({
    value: '',
    error: '',
    showError: false,
    rules: ['email', 'required'],
  });
  const [loading, setLoading] = useState(false);
  const [successRestart, setSuccessRestart] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const navigate = useNavigate();

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
      setShowFeedback(false);
      setLoading(true);
      const result = await props.onRestart(email.value);
      setLoading(false);
      if (result) {
        setSuccessRestart(true);
        setShowFeedback(true);
      } else {
        setSuccessRestart(false);
        setShowFeedback(true);
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

  const actionFeedback = successRestart ? (
    <SuccessAlert
      message={`Sukces! Link do zmiany hasła został wysłany na twój adres ${email.value}`}
    />
  ) : (
    <ErrorAlert error={`Coś poszło nie tak! Spróbuj później!`} />
  );
  return (
    <div className="restart-password-form">
      <Title title="Resetuj hasło" />
      <form
        className="restart-password-form__form"
        onSubmit={(e: React.SyntheticEvent) => restartPassword(e)}
      >
        {successRestart || showFeedback ? null : (
          <LoginInput
            placeHolder={'Email'}
            value={email.value}
            onChange={(value: string) => {
              changeHandler(value);
            }}
            error={email.error}
            showError={email.showError}
          />
        )}
        {showFeedback ? actionFeedback : null}
        {successRestart ? null : (
          <ButtonWithSpinner
            value="Resetuj hasło"
            loading={loading}
            action={() => null}
          />
        )}
      </form>
      <Underline />
      <p className="restart-password-form__login-text">Wróc do strony</p>
      <Button value="Logowania" action={() => navigate('/login')} />
    </div>
  );
}
