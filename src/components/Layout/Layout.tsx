import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import Nav from './Nav/Nav';
import './Layout.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer />
        </div>
      ) : (
        <div>{props.content}</div>
      )}
    </>
  );
}
