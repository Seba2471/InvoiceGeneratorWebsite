import React from 'react';
import '../Input.scss';

type PropsTypes = {
  label: string;
  className?: string;
  onChange: Function;
  error?: string;
  showError?: boolean;
  value: Date;
};

export default function InputDate(props: PropsTypes) {
  const className = props.className;
  return (
    <div className={`form-group form-input ${className}`}>
      <label className="form-input__label"> {props.label}</label>
      <input
        value={props.value.toISOString().split('T')[0]}
        onChange={(e) => props.onChange(new Date(e.target.value))}
        type="date"
        className={`form-control form-input__input ${
          props.error ? 'is-invalid' : ''
        }`}
      />
      <div className="form-input__feedback invalid-feedback">{props.error}</div>
    </div>
  );
}
