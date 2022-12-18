import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import styles from './Layout.module.css';

type PropsTypes = {
  header: JSX.Element;
  menu: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
};

export default function Layout(props: PropsTypes) {
  const { state } = useContext(AuthContext);

  return (
    <div className={`${styles.main} container`}>
      <div>
        {state.isAuthenticated ? (
          <>
            <div className="mt-2">{props.header}</div>
            <div className="mt-0">{props.menu} </div>
          </>
        ) : null}
        <div className={`mt-md-3 mt-2 ${styles.content}`}>{props.content}</div>
      </div>
      <div className="mt-3">{props.footer} </div>
    </div>
  );
}
