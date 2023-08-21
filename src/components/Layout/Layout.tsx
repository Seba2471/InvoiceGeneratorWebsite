import Nav from './Nav/Nav';
import './Layout.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '../../data/auth/auth';

type PropsTypes = {
  header: JSX.Element;
  menu: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
};

export default function Layout(props: PropsTypes) {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  return (
    <>
      {isAuthenticated ? (
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
