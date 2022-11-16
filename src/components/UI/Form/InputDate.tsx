import React from 'react';

type PropsTypes = {
  label: string;
  className?: string;
  onChange: Function;
  error?: string;
  value: string;
};

export default function InputDate(props: PropsTypes) {
  const className = props.className;
  return (
    <div className={`form-group ${className}`}>
      <label> {props.label}</label>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type='date'
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>{props.error}</div>
    </div>
  );
}
