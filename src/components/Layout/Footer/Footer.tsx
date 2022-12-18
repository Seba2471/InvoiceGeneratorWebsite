import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.mainFooter}>
      {`Copyright © Generator Faktur ${year}`}{' '}
    </footer>
  );
};

export default Footer;
