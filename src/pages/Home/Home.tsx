import React from 'react';
import InvoiceForm from '../../components/Forms/InvoiceForm/InvoiceForm';
import PageTitle from '../../components/Shared/PageTitle/PageTitle';
import './Home.scss';

export default function Home() {
  return (
    <div className="home-page">
      <PageTitle value="Nowa faktura" />
      <InvoiceForm />
    </div>
  );
}
