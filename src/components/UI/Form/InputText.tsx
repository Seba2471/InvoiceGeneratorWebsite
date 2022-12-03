import React from 'react';

type Props = {
  className?: string;
  label: string;
  value: string;
  type: string;
  error?: string;
  showError: boolean;
  onChange: Function;
};

function InputText(props: Props) {
  const className = props.className;
  return (
    <div className={`form-group ${className}`}>
      {props.label ? <label> {props.label}</label> : null}
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className={`form-control ${
          props.error && props.showError ? 'is-invalid' : ''
        }`}
      />
      <div className='invalid-feedback'>{props.error}</div>
    </div>
  );
}

InputText.defaultProps = {
  type: 'text',
  showError: false,
  error: '',
};

export default InputText;
