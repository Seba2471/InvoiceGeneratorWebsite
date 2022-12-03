import { InvoiceFormItemType } from '../../components/Forms/InvoiceForm/InvoiceFormType';
import { InvoiceItem } from '../../types/InvoiceType';

const mapInvoiceFormItemToInvoiceItem = (
  invoiceFormItems: Array<InvoiceFormItemType>,
) => {
  const mappedInvoiceItems = invoiceFormItems.map((item) => {
    const newItem: InvoiceItem = {
      name: item.name.value,
      quantity: item.quantity.value,
      cost: item.cost.value,
    };
    return newItem;
  });

  return mappedInvoiceItems;
};

export default mapInvoiceFormItemToInvoiceItem;
