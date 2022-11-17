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
};

export default function Button(props: PropsTypes) {
  const className = props.className;
  const buttonStyles = {
    backgroundColor: props.backgroundColor || '#85b6ff',
    color: props.textColor || 'white',
    width: props.width || '100%',
    marginTop: props.marginTop || '1rem',
    padding: props.padding || '1rem 5rem',
  };

  return (
    <button
      className={`btn ${className}`}
      style={buttonStyles}
      onClick={(e) => props.onClick}
    >
      {props.children}
    </button>
  );
}
