export type Invoice = {
  InvoiceNumber: string;
  InvoiceItems: Array<InvoiceItem>;
  SoldDate: string;
  IssueDate: string;
  Seller: {
    FullName: string;
    NIP: string;
    Address: {
      Line1: string;
      Line2: string;
      Country: string;
    };
  };
  Buyer: {
    FullName: string;
    NIP: string;
    Address: {
      Line1: string;
      Line2: string;
      Country: string;
    };
  };
};

export type InvoiceItem = {
  Name: string;
  Quantity: number;
  Cost: number;
  Value: number;
};
