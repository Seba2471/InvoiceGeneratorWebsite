import React from 'react';
import './Alert.scss';

export default function SuccessAlert(props: { message: string }) {
  const errorMessage = (
    <div className="alert alert-success mt-3 col- text-center">
      <p className="alert__message">{props.message}</p>
    </div>
  );
  return props.message ? errorMessage : null;
}
