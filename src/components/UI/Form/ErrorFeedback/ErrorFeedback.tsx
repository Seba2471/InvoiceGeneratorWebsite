import React from 'react';
import './ErrorFeedback.scss';

export default function ErrorFeedback(props: { error: string }) {
  return (
    <div className="errorFeedback">
      <input className="errorFeedback__input is-invalid" />
      <div className="errorFeedback__message invalid-feedback">
        {props.error}
      </div>
    </div>
  );
}
