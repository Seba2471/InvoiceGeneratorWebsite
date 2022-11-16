import React from 'react';
import styles from './RegisterForm.module.css';

export default function RegisterForm(props: { onRegister: Function }) {
  return (
    <div className='main'>
      <h1 className={`text-center ${styles.header}`}>Rejestracja </h1>
      <div className='input-group input-group-lg mt-4'>
        <input
          type='text'
          className='form-control'
          aria-label='Sizing example input'
          aria-describedby='inputGroup-sizing-lg'
          placeholder='Email'
        />
      </div>
      <div className='input-group input-group-lg mt-2'>
        <input
          type='password'
          className='form-control'
          aria-label='Sizing example input'
          aria-describedby='inputGroup-sizing-lg'
          placeholder='Hasło'
        />
      </div>
      <div className='input-group input-group-lg mt-2'>
        <input
          type='password'
          className='form-control'
          aria-label='Sizing example input'
          aria-describedby='inputGroup-sizing-lg'
          placeholder='Powtórz hasło'
        />
      </div>
      <button
        className={`btn ${styles.loginButton}`}
        style={{ backgroundColor: '#85b6ff', color: 'white' }}
        onClick={() => props.onRegister()}
      >
        Zarejestuj się !
      </button>
    </div>
  );
}
