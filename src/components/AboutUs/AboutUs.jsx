import React from "react";
import { useParams } from "react-router-dom";
import './AboutUs.css'

function AboutUs() {
    useParams();
    return (
        <div className="about-us-container">
            <h2>Välkommen till Hemmakocken – där varje måltid blir ett mästerverk!</h2>
            <p className="text">Vi tror att mat är mer än bara ingredienser på en tallrik – det är en upplevelse, en stund av kreativitet, och ett sätt att dela kärlek och glädje.
                <br /><br />På Hemmakocken samlar vi recept som inte bara smakar gott, utan också inspirerar dig att tänja gränserna i köket. Vare sig du är en erfaren kock eller helt ny i köket, är vårt mål att ge dig verktygen och inspirationen du behöver för att skapa mat som får smaklökarna att jubla.
                <br /><br />Här hittar du allt från moderna tolkningar av klassiska rätter till nya smakexplosioner från världens alla hörn. Med noggrant utvalda recept, smarta tips och tydliga steg-för-steg-guider gör vi det enkelt och roligt att laga mat som imponerar.
                <br /><br />Följ med Habib, Mashrur, Sorella och Zakaria på denna smakresa – och bli en hemmakock på riktigt!</p>
        </div>
    );
}
export default AboutUs;
