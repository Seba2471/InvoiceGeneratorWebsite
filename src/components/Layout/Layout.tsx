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
        {state.user.isAuthenticated ? (
          <>
            <div>{props.header}</div>
            <div>{props.menu} </div>
          </>
        ) : null}
        <div className={`${styles.content} p-5`}>{props.content}</div>
      </div>
      {/* <div>{props.footer} </div> */}
    </div>
  );
}
