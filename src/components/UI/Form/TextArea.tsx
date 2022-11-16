import React from 'react';

type PropsTypes = {
  label: string;
  value: string;
  className: string;
  error: string;
  onChange: Function;
};

function TextArea(props: PropsTypes) {
  const className = props.className;

  return (
    <div className={`form-group ${className}`}>
      <label> {props.label}</label>
      <textarea
        value={props.value}
        onChange={(e: any) => props.onChange(e.target.value)}
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>{props.error}</div>
    </div>
  );
}

TextArea.defaultProps = {
  error: '',
  showError: false,
};

export default TextArea;
