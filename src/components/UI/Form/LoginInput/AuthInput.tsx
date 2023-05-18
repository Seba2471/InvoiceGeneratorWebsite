import React, { useId } from 'react';
import './AuthInput.scss';

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

export default function AuthInput(props: PropsTypes) {
  const id = useId();
  const type = props.type || 'text';

  return (
    <div className={`auth-input__input-group`}>
      <input
        type={type.toString()}
        className={`form-control auth-input__input ${
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
        <p style={{ margin: '0' }}>{props.error}</p>
      </div>
    </div>
  );
}
