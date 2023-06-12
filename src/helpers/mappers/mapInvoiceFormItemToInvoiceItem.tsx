import { FormProperty } from '../../types/Forms/FormProperty';
import { InvoiceFormItemType } from '../../types/Invoice/Form/InvoiceFormType';
import { InvoiceItem } from '../../types/Invoice/InvoiceType';

const mapInvoiceFormItemToInvoiceItem = (
  invoiceFormItems: FormProperty<Array<InvoiceFormItemType>>,
) => {
  const mappedInvoiceItems = invoiceFormItems.value.map((item) => {
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
