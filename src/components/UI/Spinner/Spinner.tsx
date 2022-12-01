import React from 'react';

export default function Spinner(props: { size?: string }) {
  const size = props.size || 'xl';
  return (
    <span
      className={`align-middle spinner-border spinner-border-${size} text-primary`}
      role='status'
      aria-hidden='true'
    />
  );
}
