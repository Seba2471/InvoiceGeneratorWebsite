import React from 'react';
import './Button.scss';

export default function Button(props: { value: string; action: Function }) {
  console.log(props.action);

  return (
    <button className="btn" onClick={() => props.action()}>
      {props.value}
    </button>
  );
}
