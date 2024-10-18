import React from 'react';
import './RecipeCard.css';
import Rating from "../rating/Rating.jsx";
import Rating from "../rating/Rating.jsx";
import DifficultyLevel from "../difficultyLevel/DifficultyLevel.jsx";

// Component for individual recipe card
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
                {/* Display only the average rating statically */}
                {/* Display only the average rating statically */}
                <Rating
                    recipeId={recipe._id}
                    ratingValue={recipe.avgRating} // Show the average rating from the API
                    isStatic={true} // Make sure the rating is static, so it's not clickable
                    ratingValue={recipe.avgRating} // Show the average rating from the API
                    isStatic={true} // Make sure the rating is static, so it's not clickable
                />
                <DifficultyLevel timeInMins={recipe.timeInMins} />
            </div>
        </div>
        <div className="details">
            <span>Tid: {recipe.timeInMins} minuter</span>
            <span>Pris: {recipe.price} SEK</span>
        </div>
        {/* Add "Se det här receptet" button to open RecipeDetail */}
        <div className="view-recipe-button">
            <button onClick={() => showRecipeDetails(recipe)}>
                Se det här receptet
            </button>
        </div>
        {/* Add "Se det här receptet" button to open RecipeDetail */}
        <div className="view-recipe-button">
            <button onClick={() => showRecipeDetails(recipe)}>
                Se det här receptet
            </button>
        </div>
    </div>
);


export default RecipeCard;
