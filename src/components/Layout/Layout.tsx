import React from 'react';

type PropsTypes = {
  menu: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
};

export default function Layout(props: PropsTypes) {
  return (
    <div>
      <div>{props.menu} </div>
      <div className='container'>{props.content}</div>
      <div>{props.footer} </div>
    </div>
  );
}
