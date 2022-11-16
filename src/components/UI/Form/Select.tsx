import React from 'react';

type PropsTypes = {
  className?: string;
  label: string;
  options: Array<OptionType>;
  value: string | number;
  onChange: Function;
  error?: string;
};

type OptionType = {
  value: string;
  label: string;
};

export default function Select(props: PropsTypes) {
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
      <div className='invalid-feedback'>{props.error}</div>
    </div>
  );
}
