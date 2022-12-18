import React from 'react';
import { IoIosConstruct } from 'react-icons/io';
export default function PageUnderConstruction() {
  return (
    <div className="text-center p-5" style={{ minHeight: '35vh' }}>
      <h1 className="mt-5">
        <IoIosConstruct />
      </h1>
      <div> Strona w budowie</div>
    </div>
  );
}
