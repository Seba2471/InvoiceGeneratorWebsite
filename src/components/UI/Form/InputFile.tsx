import React, { useRef } from 'react';

type PropsTypes = {
  onChange: Function;
};

export default function InputFile(props: PropsTypes) {
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const changeHandler = (e: any) => {
    props.onChange(e.target.files[0]);
  };

  return (
    <div className='form-group'>
      <input type='file' onChange={changeHandler} ref={fileRef || undefined} />
    </div>
  );
}
