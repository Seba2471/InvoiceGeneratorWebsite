import React from 'react';
import './Alert.scss';

export default function ErrorAlert(props: { error: string }) {
  const errorMessage = (
    <div className="alert alert-danger mt-3 col- text-center">
      <p className="alert__message">{props.error}</p>
    </div>
  );
  return props.error ? errorMessage : null;
}
