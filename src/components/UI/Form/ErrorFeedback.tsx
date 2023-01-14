import React from 'react';

export default function ErrorFeedback(props: {
  error: string;
  className?: string;
  fontSize?: string;
  textAlign?: 'right' | 'left' | 'center';
}) {
  const fontSize = props.fontSize || '1.1rem';
  const textAlign = props.textAlign || 'left';
  const className = props.className || '';

  return (
    <div className={`${className}`}>
      <input className="d-none is-invalid" />
      <div
        id="loginErrorsFeedback"
        className="invalid-feedback"
        style={{ fontSize, textAlign }}
      >
        {props.error}
      </div>
    </div>
  );
}
