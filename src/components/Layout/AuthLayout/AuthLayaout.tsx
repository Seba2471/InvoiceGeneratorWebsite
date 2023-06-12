import React from 'react';
import wave from '../../../assets/images/wave.png';
import bg from '../../../assets/images/bg.svg';
import './AuthLayaout.scss';

export default function AuthLayaout(props: { content?: JSX.Element }) {
  return (
    <div className="auth">
      <img className="auth__wave-img" src={wave} alt="" />
      <img className="auth__img" src={bg} alt="" />
      <div className="auth__wrapper">
        <div className="auth__form">
          {props.content}
          <div className="auth__form-shadow"></div>
        </div>
      </div>
    </div>
  );
}
