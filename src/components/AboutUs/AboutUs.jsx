import React from "react";
import { useParams } from "react-router-dom";
import './AboutUs.css'

function AboutUs() {
    useParams();
    return (
        <div className="about-us-container">
            <h1>Om oss</h1>
            <p className="text">Vi är grupp 7 i ITP24 och JU23 på IT-Högskolan i Stockholm och det här är vårt kursöverskridande arbete i kursen Agil Utveckling. Gruppen består av Habib, Mashrur, Zakaria och Sorella.</p>
        </div>
    );
}
export default AboutUs;
