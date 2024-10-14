import React from "react";
import { useParams } from "react-router-dom";
import headerImage from '../assets/images/headdish.jpg';

function SingleRecipe() {
    const { id } = useParams();
    return (
        <div>
            <img src={headerImage} id="headerimg" alt="tasty dish image" />
            <h1>Food galaxy</h1>
        </div>
    );
}

export default SingleRecipe;
