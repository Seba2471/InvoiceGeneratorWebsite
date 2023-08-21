import React, { useEffect } from 'react';
import ErrorAlert from '../../../UI/Alerts/ErrorAlert';
import SuccessAlert from '../../../UI/Alerts/SuccessAlert';
import Button from '../../../UI/Buttons/Button/Button';
import ButtonWithSpinner from '../../../UI/Buttons/ButtonWithSpinner/ButtonWithSpinner';
import { useState } from 'react';
import Title from '../../Shared/Title/Title';
import Underline from '../../Shared/Underline/Underline';
import './ConfirmEmailForm.scss';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConfirmEmailForm() {
  const { email } = useParams();
  const [successedSend, setSuccessedSend] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendNewMessage = async () => {
    setLoading(true);
    // (await props.sendNewMessage())
    //   ? setSuccessedSend(true)
    //   : setSuccessedSend(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  return (
    <div className="auth-form confirm-email-form">
      <Title title="Potwierdz email" />
      {successedSend ? (
        <SuccessAlert
          message={`Sukces! Link do aktywacji konta został wysłany na twój adres ${email}`}
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
