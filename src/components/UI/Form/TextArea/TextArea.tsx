import './TextArea.scss';

type Props = {
  className?: string;
  label: string;
  value: string;
  error?: string;
  showError: boolean;
  onChange: Function;
};

function TextArea(props: Props) {
  const className = props.className;
  return (
    <div className={`form-group form-input ${className}`}>
      {props.label ? (
        <label className="form-input__label"> {props.label}</label>
      ) : null}
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`form-control form-input__input ${
          props.error && props.showError ? 'is-invalid' : ''
        }`}
      />
      <div className="form-input__feedback invalid-feedback">{props.error}</div>
    </div>
  );
}

export default TextArea;
