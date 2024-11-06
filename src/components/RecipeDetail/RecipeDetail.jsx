import React, { useState } from 'react';
import './RecipeDetail.css';
import DifficultyLevel from '../difficultyLevel/DifficultyLevel.jsx';
import Rating from '../rating/Rating.jsx';
import Comments from "../comments/Comment.jsx";

const RecipeDetail = ({ selectedRecipe, closeDetails, ratings }) => {
    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

    if (!selectedRecipe) return null;

    const handleRatingSubmit = () => {
        setIsRatingSubmitted(true);
    };

    const handleModalClose = () => {
        setIsRatingSubmitted(false);
        closeDetails();
    };

    return (
        <>
            <div className="overlay" onClick={handleModalClose} />
            <div className="recipe-details">
                <button className="close-button" onClick={handleModalClose}>✖</button>
                <h2>{selectedRecipe.title}</h2>
                <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} style={{maxWidth: '200px'}}/>
                <p>{selectedRecipe.description}</p>

                <div className="details-container">
                    <div className="ingredients">
                        <h3>Ingredienser:</h3>
                        <ul>
                            {selectedRecipe.ingredients.map((ingredient) => (
                                <li key={ingredient._id}>
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="instructions">
                        <h3>Gör så här:</h3>
                        <ol>
                            {selectedRecipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="rating-difficulty-section">
                    <Rating
                        recipeId={selectedRecipe._id}
                        ratingValue={ratings[selectedRecipe._id]}
                        isStatic={isRatingSubmitted}
                        onRatingSubmit={handleRatingSubmit}
                    />

                    <DifficultyLevel timeInMins={selectedRecipe.timeInMins} />
                </div>

                <div className="details">
                    <span>Tid: {selectedRecipe.timeInMins} minuter</span>
                    <span>Pris: {selectedRecipe.price} SEK</span>
                </div>
                <Comments recipeId={selectedRecipe._id} />
            </div>
        </>
    );
};

export default RecipeDetail;
