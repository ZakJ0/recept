import React, { useState } from "react";
import './HamburgerMenu.css';
import Navbar from "../NavBar";


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
                        </ul>
                </div>
            )}
        </div>
    );

};

export default HamburgerMenu;