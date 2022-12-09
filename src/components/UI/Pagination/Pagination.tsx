import { totalmem } from 'os';
import React from 'react';
import PageItem from './PageItem';

type PropsTypes = {
  page: number;
  totalPages: number;
  setPage: Function;
};

export default function Pagination(props: PropsTypes) {
  const previusButton = (
    <li
      className={`page-item ${props.page === 1 ? 'disabled' : ''}`}
      onClick={() => (props.page > 1 ? props.setPage(props.page - 1) : null)}
    >
      <span className='page-link'>Poprzednia</span>
    </li>
  );

  const nextButton = (
    <li
      className={`page-item ${
        props.page === props.totalPages ? 'disabled' : ''
      }`}
      onClick={() =>
        props.page + 1 <= props.totalPages
          ? props.setPage(props.page + 1)
          : null
      }
    >
      <span className='page-link'>Następna</span>
    </li>
  );

  const previusPages = () => {
    if (props.page > 2) {
      return (
        <>
          <PageItem setPage={props.setPage} page={props.page - 2} />
          <PageItem setPage={props.setPage} page={props.page - 1} />
        </>
      );
    } else if (props.page === 2) {
      return <PageItem setPage={props.setPage} page={props.page - 1} />;
    }
  };

  const nextPages = () => {
    if (props.page === 1) {
      const pageItems = [];

      for (let i = 1; i < props.totalPages; i++) {
        pageItems.push(
          <PageItem key={i} setPage={props.setPage} page={props.page + i} />,
        );
      }
      return <>{pageItems}</>;
    } else if (props.page === 2) {
      const pageItems = [];

      for (let i = 1; i < props.totalPages - 1; i++) {
        pageItems.push(
          <PageItem key={i} setPage={props.setPage} page={props.page + i} />,
        );
      }
      return <>{pageItems}</>;
    } else if (props.page + 1 < props.totalPages) {
      return (
        <>
          <PageItem setPage={props.setPage} page={props.page + 1} />
          <PageItem setPage={props.setPage} page={props.page + 2} />
        </>
      );
    } else if (props.page + 1 === props.totalPages) {
      return <PageItem setPage={props.setPage} page={props.page + 1} />;
    }
  };

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination'>
        {previusButton}
        {previusPages()}
        <PageItem
          className='active'
          setPage={props.setPage}
          page={props.page}
        />
        {nextPages()}
        {nextButton}
      </ul>
    </nav>
  );
}
