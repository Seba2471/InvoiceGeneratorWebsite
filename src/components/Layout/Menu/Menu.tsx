import React from 'react';
import styles from './Menu.module.css';
import MenuLink from './MenuLink/MenuLink';
import { homeIcon, invoiceIcon, contractorsIcon, settingsIcon } from './Icons';

export default function Menu() {
  return (
    <div
      className={`d-none d-md-flex row mt-3 ps-3 pe-3 ${styles.main} align-items-center`}
    >
      <div className='col-3 col-lg-3'>
        <MenuLink color='#9747FF' label='Strona główna' to='/'>
          {homeIcon}
        </MenuLink>
      </div>
      <div className='col-4 col-lg-3'>
        <MenuLink color='#85B6FF' label='Moje faktury' to='/my-invoices'>
          {invoiceIcon}
        </MenuLink>
      </div>
      <div className='col-4 col-lg-3'>
        <MenuLink color='#4ECB71' label='Kontrahenci' to='/nowa-faktura1'>
          {contractorsIcon}
        </MenuLink>
      </div>
      <div className='d-none d-lg-block col-4 col-lg-3'>
        <MenuLink color='#EE9C22' label='Ustawienia' to='/nowa-faktura2'>
          {settingsIcon}
        </MenuLink>
      </div>
    </div>
  );
}
