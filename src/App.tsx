import Layout from './components/Layout/Layout';
import Footer from './components/Layout/Footer/Footer';
import Menu from './components/Layout/Menu/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Layout/Header/Header';
import { useReducer } from 'react';
import { reducer, initialState } from './store/auth/authReducer';
import AuthContext from './contexts/authContext';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import Register from './pages/Auth/Register/Register';
import Invoices from './pages/Invoices/Invoices';
import PageUnderConstruction from './pages/PageUnderConstruction/PageUnderConstruction';
import Login from './pages/Auth/Login/Login';
import RestartPassword from './pages/Auth/RestartPassword/RestartPassword';

const header = <Header />;
const menu = <Menu />;

const content = (
  <Routes>
    <Route path="/" element={<AuthenticatedRoute />}>
      <Route path="/my-invoices" element={<Invoices />} />
      <Route path="/contractors" element={<PageUnderConstruction />} />
      <Route path="/settings" element={<PageUnderConstruction />} />
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/password_restart" element={<RestartPassword />} />
  </Routes>
);

const footer = <Footer />;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Layout header={header} menu={menu} content={content} footer={footer} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
