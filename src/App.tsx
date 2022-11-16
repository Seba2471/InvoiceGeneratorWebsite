import './App.css';
import Layout from './components/Layout/Layout';
import InvoiceForm from './components/Forms/InvoiceForm/InvoiceForm';
import Footer from './components/Layout/Footer/Footer';
import Menu from './components/Layout/Menu/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Layout/Header/Header';
import { useReducer } from 'react';
import { reducer, initialState } from './reducers/auth/authReducer';
import AuthContext from './contexts/authContext';
import Login from './pages/Login/Login';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';

const header = <Header />;
const menu = <Menu />;

const content = (
  <Routes>
    <Route path='/' element={<AuthenticatedRoute />}>
      <Route path='/nowa-faktura' element={<InvoiceForm />} />
      <Route path='/' element={<Home />} />
    </Route>
    <Route path='/login' element={<Login />} />
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
