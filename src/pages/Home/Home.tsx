import React from 'react';
import InvoiceForm from '../../components/Forms/InvoiceForm/InvoiceForm';
import PageTitle from '../../components/Shared/PageTitle/PageTitle';

export default function Home() {
  return (
    <div>
      <PageTitle value="Nowa faktura" />
      <InvoiceForm />
    </div>
  );
}
