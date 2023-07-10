import React from 'react';
import InvoiceListItemSkeleton from './InvoiceListItem/InvoiceListItem.Skeleton';

export default function InvoicesListSkeleton(props: { items: number }) {
  const items = [];
  for (let i = 0; props.items > i; i++) {
    items.push(<InvoiceListItemSkeleton key={i} />);
  }
  return <> {items} </>;
}
