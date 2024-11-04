import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div class="footer-left">
                <p>IT-Högskolan</p>
                <p>Trekantsvägen 1</p>
                <p>117 43 Stockholm</p>
            </div>
            <div class="footer-center">
                <h3>"Citat"</h3>
            </div>
            {/*
            <ul className="footer-links">
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/categories">Kategorier</Link></li>
                <li><Link to="/aboutus">Om oss</Link></li>
            </ul>
            <div className="email-button">
                <Link to="/send-recipe">
                    <button>Skicka in ditt eget recept!</button>
                </Link>
            </div>
            */}
        
        </footer>
    );
}

export default Footer;