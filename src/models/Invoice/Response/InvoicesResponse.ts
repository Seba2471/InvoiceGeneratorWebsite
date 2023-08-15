export interface InvoicesResponse {
  /**
   * Id of the invoice received from api
   */
  id: string;
  /**
   * Invoice number issued by user
   */
  invoiceNumber: string;
  /**
   * Issue date choosed by user
   */
  issueDate: string;
  /**
   * Seller specified on the invoice by the user
   */
  sellerFullName: string;
  /**
   * Buyer specified on the invoice by the user
   */
  buyerFullName: string;
  /**
   * Total value of all items on the invoice
   */
  amount: number;
  /**
   * Invoice currency choosed by the user
   */
  currency: string;
}
