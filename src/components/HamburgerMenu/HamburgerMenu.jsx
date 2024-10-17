import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './HamburgerMenu.css'

const HamburgerMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {isOpen && (
                <div className={`side-menu ${isOpen ? 'side-menu-open' : ''}`}>
                    <div className="close-icon" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <ul>
                        <li>Recept</li>
                        <li>Teman</li>
                        <li>Hem</li>

                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/SingleRecipe">Kategorier</Link></li>
                        <li><a href="#2">Teman</a></li>
                    </ul>
                </div>
            )}
        </div>
    );

};

export default HamburgerMenu;