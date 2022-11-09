import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Navbar() {
  const { lang } = useContext(AppContext);
  const showNavbar = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');

    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
  };

  const closeToggle = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');

    menuToggle.classList.remove('active');
    navigation.classList.remove('active');
  };

  return (
    <header>
      <Link to="/" className="logo">
        Notes
        <span>App</span>
      </Link>

      <button type="button" className="menu-toggle" onClick={showNavbar} aria-label="navigation-menu" />
      <ul className="navigation">
        <li><Link onClick={closeToggle} to="/">{lang === 'id' ? 'Beranda' : 'Home'}</Link></li>
        <li><Link onClick={closeToggle} to="/archived">{lang === 'id' ? 'Arsip' : 'Archive'}</Link></li>
      </ul>
    </header>
  );
}

export default Navbar;
