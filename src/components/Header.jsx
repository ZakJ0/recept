import React from "react";
import '../css/Header.css';
import headerImage from '../assets/images/headdish.jpg';

function Header() {
    return (
        <header>
            <img src={headerImage} id="headerimg" alt="tasty dish image" />
            <h1>Food galaxy</h1>
        </header>
    );
}

export default Header;
