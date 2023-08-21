import React from 'react';
import './Button.scss';

export default function Button(props: {
  classname?: string;
  value: string;
  action: Function;
}) {
  return (
    <button className={`${props.classname} btn`} onClick={() => props.action()}>
      {props.value}
    </button>
  );
}
