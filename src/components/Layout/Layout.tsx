import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import Nav from './Nav/Nav';
import './Layout.scss';

type PropsTypes = {
  header: JSX.Element;
  menu: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
};

export default function Layout(props: PropsTypes) {
  const { state } = useContext(AuthContext);

  return (
    <>
      {state.isAuthenticated ? (
        <div className="layout">
          <div className="layout__nav">
            <Nav />
          </div>
          <div className="layout__content">{props.content}</div>
          {/* <div className={`${styles.main}`}>
            <div className="mt-2">{props.header}</div>
            <div className="mt-0">{props.menu} </div>
            <div className={`mt-md-3 mt-2 ${styles.content}`}>
              {props.content}
            </div>
            <div className="mt-3">{props.footer} </div>
          </div> */}
        </div>
      ) : (
        <div>{props.content}</div>
      )}
    </>
  );
}
