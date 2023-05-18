import React from 'react';
import Spinner from '../../Spinner/Spinner';
import Button from '../Button/Button';

export default function ButtonWithSpinner(props: {
  value: string;
  loading: boolean;
  action: Function;
}) {
  return props.loading ? (
    <Spinner />
  ) : (
    <Button value={props.value} action={props.action} />
  );
}
