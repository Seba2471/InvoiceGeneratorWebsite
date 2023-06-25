import React from 'react';
import Spinner from '../../Spinner/Spinner';
import Button from '../Button/Button';
import './ButtonWithSpinner.scss';

export default function ButtonWithSpinner(props: {
  classnameSpinner?: string;
  classnameButton?: string;
  value: string;
  loading: boolean;
  action: Function;
}) {
  return props.loading ? (
    <div
      className={`button-with-spinner__spinner-container ${props.classnameSpinner}`}
    >
      <Spinner />
    </div>
  ) : (
    <Button
      classname={`${props.classnameButton}`}
      value={props.value}
      action={props.action}
    />
  );
}
