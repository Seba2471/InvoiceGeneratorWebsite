import React from 'react';

export default function TableHeader() {
  return (
    <div className="d-none d-lg-flex">
      <div className="row m-0 col-12 justify-content-center text-center align-items-center">
        <div className="col-2"> Nr faktury</div>
        <div className="col-2"> Data wystawienia</div>
        <div className="col-2 "> Sprzedajacy</div>
        <div className="col-2 "> Kupujący</div>
        <div className="col-2"> Kwota</div>
        <div className="col-2"> Akcje </div>
      </div>
    </div>
  );
}
