import React from 'react';

export default function ErrorAlert(props: { error: string }) {
  const errorMessage = (
    <div className='alert alert-danger mt-3 col- text-center'>
      {props.error}
    </div>
  );
  return props.error ? errorMessage : null;
}
