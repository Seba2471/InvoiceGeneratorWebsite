import React from 'react';
import styles from './Layout.module.css';

type PropsTypes = {
  header: JSX.Element;
  menu: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
};

export default function Layout(props: PropsTypes) {
  return (
    <div className={`${styles.main} container`}>
      <div>
        <div>{props.header}</div>
        <div>{props.menu} </div>
        <div className='container'>{props.content}</div>
      </div>
      <div>{props.footer} </div>
    </div>
  );
}
