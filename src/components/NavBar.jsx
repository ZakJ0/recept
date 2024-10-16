import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/recipe-list">Startsida</Link></li>
        <li><a href="#2">Teman</a></li>
        <li><a href="#3">Kategorier</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;