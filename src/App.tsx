import Layout from './components/Layout/Layout';
import Footer from './components/Layout/Footer/Footer';
import Menu from './components/Layout/Menu/Menu';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Layout/Header/Header';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import Register from './pages/Auth/Register/Register';
import Invoices from './pages/Invoices/Invoices';
import PageUnderConstruction from './pages/PageUnderConstruction/PageUnderConstruction';
import Login from './pages/Auth/Login/Login';
import RestartPassword from './pages/Auth/RestartPassword/RestartPassword';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { history, routerSelector } from './store/store';
import ConfirmEmailForm from './components/Auth/Register/ConfirmEmailForm/ConfirmEmailForm';

const header = <Header />;
const menu = <Menu />;

const content = (
  <Routes>
    <Route path="/" element={<AuthenticatedRoute />}>
      <Route path="/my-invoices" element={<Invoices />} />
      <Route path="/contractors" element={<PageUnderConstruction />} />
      <Route path="/stats" element={<PageUnderConstruction />} />
      <Route path="/settings" element={<PageUnderConstruction />} />
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/password-restart" element={<RestartPassword />} />
    <Route path="/confirm-email/:email" element={<ConfirmEmailForm />} />
  </Routes>
);

const footer = <Footer />;

function App() {
  return (
    <ReduxRouter history={history} routerSelector={routerSelector}>
      <Layout header={header} menu={menu} content={content} footer={footer} />
    </ReduxRouter>
  );
}

export default App;
