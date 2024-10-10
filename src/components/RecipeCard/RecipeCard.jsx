import React from 'react';
import './RecipeCard.css';
import Rating from "../rating/rating.jsx";
import DifficultyLevel from "../difficultyLevel/DifficultyLevel.jsx";
// Component for individual recipe card
const RecipeCard = ({ recipe, showRecipeDetails }) => (
    <div className="recipe">
        <img
            src={recipe.imageUrl}
            alt={recipe.title}
            onClick={() => showRecipeDetails(recipe)}
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
    </div>
);
export default RecipeCard;