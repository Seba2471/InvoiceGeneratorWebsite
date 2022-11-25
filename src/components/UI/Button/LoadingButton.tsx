import React from 'react';

type PropsTypes = {
  className: string;
  loading: boolean;
  children: JSX.Element;
};

export default function LoadingButton(props: PropsTypes) {
  const className = props.className;

  const args = { ...props, loading: undefined };

  const loadingButton = (
    <button className={`btn ${className}`} type='button' disabled>
      <span
        className='spinner-border spinner-border-sm'
        role='status'
        aria-hidden='true'
      />
    </button>
  );

  const button = (
    <button {...args} className={`btn ${className}`}>
      {props.children}
    </button>
  );

  return props.loading ? loadingButton : button;
}
