import { Skeleton } from '@mui/material';
import './InvoiceListItem.Skeleton.scss';

export default function InvoiceListItemSkeleton() {
  return (
    <div className="invoices__loading-skeleton">
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-item"
        variant="text"
      />
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-item"
        variant="text"
      />
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-item"
        variant="text"
      />
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-item"
        variant="text"
      />
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-item"
        variant="text"
      />
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-circle-first"
        variant="circular"
      />
      <Skeleton
        animation="wave"
        className="invoices__loading-skeleton-circle-second"
        variant="circular"
      />
      <Skeleton
        animation={false}
        className="invoices__loading-skeleton-line"
        variant="rectangular"
        height={2}
      />
    </div>
  );
}
