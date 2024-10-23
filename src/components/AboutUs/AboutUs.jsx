import React from "react";
import { useParams } from "react-router-dom";
import './AboutUs.css'

function AboutUs() {
    useParams();
    return (
        <div>
            <h1>Om oss</h1>
        </div>
    );
}
export default AboutUs;
