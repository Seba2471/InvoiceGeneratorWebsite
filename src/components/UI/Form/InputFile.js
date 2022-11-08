import React, { useRef } from 'react';

export default function InputFile(props) {
  const fileRef = useRef();

  const changeHandler = (e) => {
    props.onChange(e.target.files[0]);
  };

  return (
    <div className="form-group">
      <input type="file" onChange={changeHandler} ref={fileRef} />
    </div>
  );
}
