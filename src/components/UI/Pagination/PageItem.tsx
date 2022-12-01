import React from 'react';

export default function PageItem(props: {
  className?: string;
  page: number;
  setPage: Function;
}) {
  return (
    <li
      className={`page-item ${props.className}`}
      onClick={() => props.setPage(props.page)}
    >
      <span className='page-link'>{props.page.toString()}</span>
    </li>
  );
}
