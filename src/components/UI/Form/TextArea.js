import React from 'react';

function TextArea(props) {
  const className = props.className;

  return (
    <div className={`form-group ${className}`}>
      <label> {props.label}</label>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type="text"
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

TextArea.defaultProps = {
  error: '',
  showError: false,
};

export default TextArea;
