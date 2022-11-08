import React from 'react';

function Checkbox(props) {
  const chanageFeatureHandler = (e) => {
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
    <div className="form-group">
      {props.options.map((option) => (
        <div
          className="custom-control custom-checkbox in-valid"
          key={option.value}
        >
          <input
            type="checkbox"
            className="custom-control-checkbox"
            value={option.value}
            checked={props.value.find((x) => x === option.value) || false}
            onChange={chanageFeatureHandler}
            id={option.id}
          />
          <label className="custom-control-label" htmlFor={option.value}>
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
