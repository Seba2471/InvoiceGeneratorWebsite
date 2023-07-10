import React from 'react';
import './PageTitle.scss';

export default function PageTitle(props: { value: string }) {
  return <h2 className="page-title">{props.value}</h2>;
}
