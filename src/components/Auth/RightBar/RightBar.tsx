import React from 'react';
import invoiceImage from '../../../assets/images/invoice-image.png';

export default function RightBar(props: { className?: string }) {
  const className = props.className || '';
  return (
    <div
      className={`col-6 col-md-12 ${className}`}
      style={{
        backgroundColor: '#85B6FF',
        color: 'white',
        borderRadius: '0px 45px 45px 0px',
      }}
    >
      <img
        className="img-fluid"
        style={{ marginTop: '80%' }}
        src={invoiceImage}
        alt="img"
      />
    </div>
  );
}
