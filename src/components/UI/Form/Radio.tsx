import React from 'react';

type PropsTypes = {
  options: Array<Option>;
  value: string | number;
  error: string;
  showError: boolean;
  name: string;
  onChange: Function;
};

type Option = {
  value: string | number;
  name: string;
  label: string;
};

function Radio(props: PropsTypes) {
  return (
    <div className='form-group'>
      {props.options.map((option) => (
        <div className='custom-control custom-radio' key={option.value}>
          <input
            type='radio'
            name={option.name}
            value={option.value}
            id={`radio-${option.value}-${props.name}`}
            onChange={(e) => props.onChange(e.target.value)}
            checked={props.value === option.value}
            className={`custom-control-input ${
              props.error && props.showError ? 'is-invalid' : ''
            }`}
          />
          <label className='custom-control-label' htmlFor='status-active'>
            {option.label}
          </label>
          <div className='invalid-feedback'>{props.error}</div>
        </div>
      ))}
    </div>
  );
}

export default Radio;
