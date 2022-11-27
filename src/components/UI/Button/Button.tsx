import React from 'react';

type PropsTypes = {
  onClick?: Function;
  children: JSX.Element | string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  marginTop?: string;
  padding?: string;
  loading?: boolean;
};

export default function Button(props: PropsTypes) {
  const className = props.className;
  const loading = props.loading || false;
  const buttonStyles = {
    backgroundColor: props.backgroundColor || '#85b6ff',
    color: props.textColor || 'white',
    width: props.width || '100%',
    marginTop: props.marginTop || '1rem',
    padding: props.padding || '1rem 5rem',
  };

  const spinner = (
    <span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    />
  );

  return (
    <button
      className={`btn ${className}`}
      style={buttonStyles}
      onClick={(e) => props.onClick}
    >
      {loading ? spinner : props.children}
    </button>
  );
}
