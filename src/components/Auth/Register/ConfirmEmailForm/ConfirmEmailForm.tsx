import React from 'react';
import ErrorAlert from '../../../UI/Alerts/ErrorAlert';
import SuccessAlert from '../../../UI/Alerts/SuccessAlert';
import Button from '../../../UI/Buttons/Button/Button';
import ButtonWithSpinner from '../../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import { useState } from 'react';
import Title from '../../Shared/Title/Title';
import Underline from '../../Shared/Underline/Underline';
import './ConfirmEmailForm.scss';

export default function ConfirmEmailForm(props: {
  email: string;
  sendNewMessage: Function;
}) {
  const [successedSend, setSuccessedSend] = useState(true);
  const [loading, setLoading] = useState(false);

  const sendNewMessage = async () => {
    setLoading(true);
    (await props.sendNewMessage())
      ? setSuccessedSend(true)
      : setSuccessedSend(false);
    setLoading(false);
  };

  return (
    <div className="auth-form confirm-email-form">
      <Title title="Potwierdz email" />
      {successedSend ? (
        <SuccessAlert
          message={`Sukces! Link do zmiany hasła został wysłany na twój adres ${props.email}`}
        />
      ) : (
        <ErrorAlert error={`Coś poszło nie tak! Spróbuj później!`} />
      )}
      <ButtonWithSpinner
        value="Wyślij ponownie"
        action={() => sendNewMessage()}
        loading={loading}
      />
      <Underline />
      <Button value="Przejdz dalej" action={() => null} />
    </div>
  );
}
