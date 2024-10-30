import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <ul className="footer-links">
                    <li><Link to="/">Hem</Link></li>
                    <li><Link to="/categories">Kategorier</Link></li>
                    <li><Link to="/aboutus">Om oss</Link></li>

                </ul>
            </div>
        </footer>
    );
}

export default Footer;