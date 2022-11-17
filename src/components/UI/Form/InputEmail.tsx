import React, { useId } from 'react';

type PropsTypes = {
  value: string;
  onChange: Function;
  className?: string;
  placeHolder: string;
};

export default function InputEmail(props: PropsTypes) {
  const id = useId();

  const className = props.className || 'mt-2';

  return (
    <div className={`input-group input-group-lg ${className}`}>
      <input
        type='email'
        className='form-control'
        aria-label={`email-input-${id}`}
        aria-describedby={`email-input-${id}`}
        placeholder={props.placeHolder}
        value={props.value}
        autoComplete='email'
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
