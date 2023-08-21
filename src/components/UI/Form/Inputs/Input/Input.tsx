import '../Input.scss';

type Props = {
  className?: string;
  label: string;
  value: string;
  type?: string;
  error?: string;
  showError?: boolean;
  onChange: Function;
};

function Input(props: Props) {
  const className = props.className;
  const type = props.type ? props.type : 'text';

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={`form-group form-input ${className}`}>
      {props.label ? (
        <label className="form-input__label"> {props.label}</label>
      ) : null}
      <input
        value={props.value}
        onChange={(e) => props.onChange(e)}
        onKeyDown={handleKeyPress}
        type={type}
        className={`form-control form-input__input ${
          props.error ? 'is-invalid' : ''
        }`}
      />
      <div className="form-input__feedback invalid-feedback">{props.error}</div>
    </div>
  );
}

export default Input;
