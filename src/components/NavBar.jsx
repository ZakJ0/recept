import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/recipe-list">Kategori 1</Link></li>
        <li><a href="#2">Kategori 2</a></li>
        <li><a href="#3">Kategori 3</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;