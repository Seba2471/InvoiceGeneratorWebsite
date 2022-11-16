import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={`bg-secondary ${styles.main}`}>
      Generator faktur 2022
      <a href='https://lovepik.com/images/png-avatar.html'>
        Avatar Png vectors by Lovepik.com
      </a>
    </div>
  );
}
