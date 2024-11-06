import React from 'react';
import './RecipeCard.css';
import Rating from "../rating/Rating.jsx";
import DifficultyLevel from "../difficultyLevel/DifficultyLevel.jsx";

const RecipeCard = ({ recipe, showRecipeDetails }) => (
    <div className="recipe">
        <img
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{ cursor: 'pointer' }}
        />
        <div className="recipe-content">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="rating-difficulty-section">
                <Rating
                    recipeId={recipe._id}
                    ratingValue={recipe.avgRating}
                    isStatic={true}
                />
                <DifficultyLevel timeInMins={recipe.timeInMins} />
            </div>
        </div>
        <div className="details">
            <span>Tid: {recipe.timeInMins} minuter</span>
            <span>Pris: {recipe.price} SEK</span>
        </div>
        <div className="view-recipe-button">
            <button onClick={() => showRecipeDetails(recipe)}>
                Se det här receptet
            </button>
        </div>
    </div>
);


export default RecipeCard;
