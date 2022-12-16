import React from 'react';

export default function Spinner(props: { size?: string; className?: string }) {
  const size = props.size || 'xl';
  return (
    <span
      className={`align-middle spinner-border spinner-border-${size} text-primary ${props.className}`}
      role="status"
      aria-hidden="true"
    />
  );
}
