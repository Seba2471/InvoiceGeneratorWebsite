import React, { useId } from 'react';

type PropsTypes = {
  value: string;
  onChange: Function;
  className?: string;
  inputClassName?: string;
  placeHolder: string;
  error?: string;
  showError?: boolean;
  type?: string;
};

export default function LoginInput(props: PropsTypes) {
  const id = useId();

  const className = props.className || 'mt-2';
  const inputClassName = props.inputClassName || '';
  const type = props.type || 'text';

  return (
    <div className={`input-group-lg ${className}`}>
      <input
        type={type.toString()}
        className={`form-control ${inputClassName} ${
          props.error && props.showError ? 'is-invalid' : ''
        } ${!props.error && props.value !== '' ? 'is-valid' : ''}`}
        aria-label={`password-input-${id}`}
        aria-describedby={`password-input-${id}`}
        placeholder={props.placeHolder}
        value={props.value}
        autoComplete="new-password"
        onChange={(e) => props.onChange(e.target.value)}
      />
      <div className="invalid-feedback" style={{ textAlign: 'left' }}>
        {props.error}
      </div>
    </div>
  );
}
