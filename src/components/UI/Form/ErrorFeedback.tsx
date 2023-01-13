import React from 'react';

export default function ErrorFeedback(props: {
  error: string;
  fontSize?: string;
}) {
  const fontSize = props.fontSize || '1.1rem';

  return (
    <div>
      <input className="d-none is-invalid" />
      <div
        id="loginErrorsFeedback"
        className="invalid-feedback"
        style={{ fontSize, textAlign: 'left' }}
      >
        {props.error}
      </div>
    </div>
  );
}
