import React from 'react';
import Spinner from '../Spinner/Spinner';

export default function Actions(props: {
  onDelete: Function;
  onDownolad: Function;
  loading: boolean;
  disabled: boolean;
  size?: string;
  hideDownolad?: boolean;
  hideDelete?: boolean;
  className?: string;
}) {
  const hideDownolad = props.hideDownolad || false;
  const hideDelete = props.hideDelete || false;
  const size = props.size || '32';
  const className = props.className || '';

  return (
    <div className={className}>
      {props.loading ? (
        <Spinner className={`${hideDownolad ? 'd-none' : ''}`} size="xs" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          fill={props.disabled ? 'grey' : 'green'}
          className={`bi bi-file-earmark-arrow-down ms-2 mb-2 ${
            hideDownolad ? 'd-none' : ''
          }`}
          onClick={() => (props.disabled ? null : props.onDownolad())}
          viewBox="0 0 16 16"
        >
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </svg>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="red"
        className={`bi bi-x-circle-fill ms-2 ${hideDelete ? 'd-none' : ''}`}
        onClick={() => props.onDelete()}
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
      </svg>
    </div>
  );
}
