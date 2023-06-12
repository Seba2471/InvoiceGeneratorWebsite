import React, { useState } from 'react';
import { FiHome, FiBarChart2, FiSettings } from 'react-icons/fi';
import { IoDocuments, IoPeople } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Hamburger.scss';
import './Nav.scss';

export default function Nav() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  let location = useLocation();
  return (
    <>
      <button
        className={`hamburger hamburger--spin ${
          mobileNavActive ? 'is-active' : ''
        }`}
        type="button"
        onClick={() => setMobileNavActive(!mobileNavActive)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <nav className={`navbar  ${mobileNavActive ? 'navbar--show' : ''}`}>
        <h2 className="navbar__title">
          Generator
          <br /> Faktur
        </h2>
        <div className="navbar__underline"></div>
        <div className="navbar__nav">
          <div
            className={`${
              location.pathname === '/'
                ? 'navbar__nav-item navbar__nav-item--show'
                : 'navbar__nav-item'
            }`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'navbar__nav-link navbar__nav-link--active'
                  : 'navbar__nav-link'
              }
            >
              <FiHome className="navbar__nav-link-icon" />
              <span>Strona głowna</span>
            </NavLink>
          </div>
          <div
            className={`${
              location.pathname === '/my-invoices'
                ? 'navbar__nav-item navbar__nav-item--show'
                : 'navbar__nav-item'
            }`}
          >
            <NavLink
              to="/my-invoices"
              className={({ isActive }) =>
                isActive
                  ? 'navbar__nav-link navbar__nav-link--active'
                  : 'navbar__nav-link'
              }
            >
              <IoDocuments className="navbar__nav-link-icon" />
              <span>Moje faktury</span>
            </NavLink>
          </div>
          <div
            className={`${
              location.pathname === '/contractors'
                ? 'navbar__nav-item navbar__nav-item--show'
                : 'navbar__nav-item'
            }`}
          >
            <NavLink
              to="/contractors"
              className={({ isActive }) =>
                isActive
                  ? 'navbar__nav-link navbar__nav-link--active'
                  : 'navbar__nav-link'
              }
            >
              <IoPeople className="navbar__nav-link-icon" />
              <span>Kontrahenci</span>
            </NavLink>
          </div>
          <div
            className={`${
              location.pathname === '/stats'
                ? 'navbar__nav-item navbar__nav-item--show'
                : 'navbar__nav-item'
            }`}
          >
            <NavLink
              to="/stats"
              className={({ isActive }) =>
                isActive
                  ? 'navbar__nav-link navbar__nav-link--active'
                  : 'navbar__nav-link'
              }
            >
              <FiBarChart2 className="navbar__nav-link-icon" />
              <span>Statystyki</span>
            </NavLink>
          </div>
          <div
            className={`${
              location.pathname === '/settings'
                ? 'navbar__nav-item navbar__nav-item--show'
                : 'navbar__nav-item'
            }`}
          >
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? 'navbar__nav-link navbar__nav-link--active'
                  : 'navbar__nav-link'
              }
            >
              <FiSettings className="navbar__nav-link-icon" />
              <span>Ustawienia</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
