import React from 'react';
import '../Input.scss';

type PropsTypes = {
  label: string;
  className?: string;
  onChange: Function;
  error?: string;
  showError?: boolean;
  value: string;
};

export default function InputDate(props: PropsTypes) {
  const className = props.className;
  return (
    <div className={`form-group form-input ${className}`}>
      <label className="form-input__label"> {props.label}</label>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
        className={`form-control form-input__input ${
          props.error && props.showError ? 'is-invalid' : ''
        }`}
      />
      <div className="form-input__feedback invalid-feedback">{props.error}</div>
    </div>
  );
}
