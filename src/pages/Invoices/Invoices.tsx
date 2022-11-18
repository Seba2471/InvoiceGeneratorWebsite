import React, { useEffect, useState } from 'react';
import { InvoiceShortInfo } from '../../types/Invoice';
import InvoicesTable from '../../components/InvoicesTable/InvoicesTable';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Array<InvoiceShortInfo>>([]);

  useEffect(() => {
    setInvoices([
      {
        invoiceNumber: '10/11/2022',
        issueDate: '18-11-2022',
        sellerFullName: 'Sebastian Siejak',
        buyerFullName: 'Krzysztof Jerzyna',
        amount: 50000,
        currency: 'EURO',
      },
      {
        invoiceNumber: '11/11/2022',
        issueDate: '16-11-2022',
        sellerFullName: 'Erdol Bob Budowniczy Sp. zoo',
        buyerFullName: 'Piotr Siejak',
        amount: 300,
        currency: 'PLN',
      },
    ]);
  }, []);

  const deleteInvoice = (invoiceNumber: string) => {
    console.log(`Delete ${invoiceNumber}`);
  };
  const downoladInvoice = (invoiceNumber: string) => {
    console.log(`Downolad ${invoiceNumber}`);
  };

  return (
    <div>
      <h4>Moje faktury </h4>
      <InvoicesTable
        invoices={invoices}
        deleteInvoice={(invoiceNumber: string) => deleteInvoice(invoiceNumber)}
        downoladInvoice={(invoiceNumber: string) =>
          downoladInvoice(invoiceNumber)
        }
      />
    </div>
  );
}
