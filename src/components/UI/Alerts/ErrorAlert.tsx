import React from 'react';
import './Alert.scss';

export default function ErrorAlert(props: { error: string }) {
  const errorMessage = (
    <div className="alert alert-danger ">
      <p className="alert__message text-center">{props.error}</p>
    </div>
  );
  return props.error ? errorMessage : null;
}
