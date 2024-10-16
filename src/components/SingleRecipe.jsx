import React from "react";
import { useParams } from "react-router-dom";
import headerImage from '../assets/images/headdish.jpg';

function SingleRecipe() {
    const { id } = useParams();
    return (
        <div>
            <img src={headerImage} id="headerimg" alt="tasty dish image" />
            <h1>Här kan t ex alla teman vara</h1>
            <p>Fast i en egen komponent då, som vi får igång snart :)</p>
        </div>
    );
}

export default SingleRecipe;
