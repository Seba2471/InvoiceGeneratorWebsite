import React from 'react';

export default function Spinner(props: {
  size?: string;
  className?: string;
  color?: string;
}) {
  const size = props.size || 'xl';
  return (
    <span
      style={{ color: props.color?.toString() }}
      className={`align-middle spinner-border spinner-border-${size} ${
        props.color ? '' : 'text-primary'
      } ${props.className}`}
      role="status"
      aria-hidden="true"
    />
  );
}
