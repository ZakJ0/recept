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
            <div class="footer-quote">
                <h4>"God mat skapar goda minnen"</h4>
            </div>        
        </footer>
    );
}

export default Footer;