import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import InputEmail from '../../../UI/Form/InputEmail';
import InputPassword from '../../../UI/Form/InputPassword';
import Button from '../../../UI/Button/Button';

export default function LoginForm(props: { onLogin: Function }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    props.onLogin(form);
  };

  return (
    <form className='main' onSubmit={(e) => submitForm(e)}>
      <h1 className={`text-center ${styles.header}`}> Logowanie </h1>
      <InputEmail
        placeHolder='Email'
        value={form.email}
        onChange={(value: string) => setForm({ ...form, email: value })}
      />
      <InputPassword
        placeHolder='Hasło'
        value={form.password}
        onChange={(value: string) => setForm({ ...form, password: value })}
      />
      <div className='mt-2 ms-2'>Zapomniałem hasła</div>
      <Button>Zaloguj się</Button>
    </form>
  );
}
