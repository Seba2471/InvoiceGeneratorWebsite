import './App.css';
import Layout from './components/Layout/Layout';
import InvoiceForm from './components/InvoiceForm';
import Footer from './components/Layout/Footer/Footer';
import Menu from './components/Layout/Menu/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

const menu = <Menu />;

// const content = <InvoiceForm />;

const content = (
  <Routes>
    <Route path='/nowa-faktura' element={<InvoiceForm />} />
    <Route path='/' element={<Home />} />
  </Routes>
);

const footer = <Footer />;

function App() {
  return (
    <Router>
      <Layout menu={menu} content={content} footer={footer} />
    </Router>
  );
}

export default App;
