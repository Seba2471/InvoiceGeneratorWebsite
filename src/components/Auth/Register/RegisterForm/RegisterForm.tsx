import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import InputEmail from '../../../UI/Form/InputEmail';
import InputPassword from '../../../UI/Form/InputPassword';
import styles from './RegisterForm.module.css';

export default function RegisterForm(props: { onRegister: Function }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    replyPassword: '',
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    props.onRegister(form);
  };

  return (
    <form className='main' onSubmit={(e) => submitForm(e)}>
      <h1 className={`text-center ${styles.header}`}>Rejestracja </h1>
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
      <InputPassword
        placeHolder='Powtórz hasło'
        value={form.replyPassword}
        onChange={(value: string) => setForm({ ...form, replyPassword: value })}
      />
      <Button>Zarejestuj się</Button>
    </form>
  );
}
