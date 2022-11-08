import React from 'react';

export default function Select(props) {
  const className = props.className;

  return (
    <div className={`form-group ${className}`}>
      <label> {props.label} </label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
      >
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}
