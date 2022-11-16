import React from 'react';
import invoiceImage from '../../../assets/images/invoice-image.png';

export default function RightBar() {
  return (
    <div
      className='col-6'
      style={{ backgroundColor: '#85B6FF', color: 'white' }}
    >
      <img
        className='img-fluid'
        style={{ marginTop: '35%' }}
        src={invoiceImage}
        alt='img'
      />
    </div>
  );
}
