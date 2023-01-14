import React from 'react';
import wave from '../../assets/images/wave.png';
import styles from './Auth.module.css';
import bg from '../../assets/images/bg.svg';

export default function Auth(props: { content?: JSX.Element }) {
  return (
    <div>
      <img className={`${styles.wave}`} src={wave} alt="wave" />
      <div className={`${styles.container}`}>
        <div className={`${styles.img}`}>
          <img src={bg} alt="bg" />
        </div>
        {props.content}
      </div>
    </div>
  );
}
