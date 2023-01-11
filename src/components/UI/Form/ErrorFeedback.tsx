import React from 'react';

export default function ErrorFeedback(props: { error: string }) {
  return (
    <div>
      <input className="d-none is-invalid" />
      <div
        id="loginErrorsFeedback"
        className="invalid-feedback"
        style={{ fontSize: '1.1rem', textAlign: 'left' }}
      >
        {props.error}
      </div>
    </div>
  );
}
