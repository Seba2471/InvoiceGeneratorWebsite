import React from 'react';

export default function SuccessAlert(props: { message: string }) {
  const errorMessage = (
    <div className="alert alert-success mt-3 col- text-center">
      {props.message}
    </div>
  );
  return props.message ? errorMessage : null;
}
