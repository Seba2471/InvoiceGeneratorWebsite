import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  const activeLinkClass = 'active text-decoration-underline';

  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Navbar
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse container'
          id='navbarNavAltMarkup'
        >
          <div className='navbar-nav'>
            <NavLink
              end
              to='/'
              className={({ isActive }) =>
                isActive ? `nav-link ${activeLinkClass}` : 'nav-link'
              }
            >
              Strona główna
            </NavLink>
            <NavLink
              to='/nowa-faktura'
              className={({ isActive }) =>
                isActive ? `nav-link ${activeLinkClass}` : 'nav-link'
              }
            >
              Wygeneruj fakturę
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
