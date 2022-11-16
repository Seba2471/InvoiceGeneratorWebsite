import React from 'react';

type PropsTypes = {
  value: Array<Option>;
  options: Array<Option>;
  onChange: Function;
};

type Option = {
  value: string;
  id: number;
  label: string;
};

function Checkbox(props: PropsTypes) {
  const chanageFeatureHandler = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      const newFeatures = [...props.value, value];
      props.onChange(newFeatures);
    } else {
      const newFeatures = props.value.filter((x) => x !== value);
      props.onChange(newFeatures);
    }
  };

  return (
    <div className='form-group'>
      {props.options.map((option) => (
        <div
          className='custom-control custom-checkbox in-valid'
          key={option.value}
        >
          <input
            type='checkbox'
            className='custom-control-checkbox'
            value={option.value}
            checked={
              props.value.find((x) => x.value === option.value) ? true : false
            }
            onChange={chanageFeatureHandler}
            id={option.id.toString()}
          />
          <label className='custom-control-label' htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

Checkbox.defaultProps = {
  value: [],
  showError: false,
};

export default Checkbox;
