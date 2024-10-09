// RecipeDetail.jsx
import React from 'react';
import './RecipeDetail.css'; // Import the CSS file for styling the recipe details
import DifficultyLevel from '../difficultyLevel/DifficultyLevel.jsx';

const RecipeDetail = ({ selectedRecipe, closeDetails, ratings, handleRating }) => {
    if (!selectedRecipe) return null;

    return (
        <>
            <div className="overlay" onClick={closeDetails} /> {/* Close modal on overlay click */}
            <div className="recipe-details">
                <button className="close-button" onClick={closeDetails}>✖</button> {/* Close button */}
                <h2>{selectedRecipe.title}</h2>
                <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} style={{ maxWidth: '200px' }} />
                <p>{selectedRecipe.description}</p>

                {/* Details Container for Ingredients and Instructions */}
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
                        <h3>Instruktioner:</h3>
                        <ol>
                            {selectedRecipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Rating Section in the Details Modal (clickable) */}
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={`${selectedRecipe._id}-star-${index}`} // Ensure unique key for each star
                        className={`star ${ratings[selectedRecipe._id] >= index + 1 ? 'filled' : ''}`}
                        onClick={() => handleRating(selectedRecipe._id, index + 1)} // Using selectedRecipe._id here
                        style={{ cursor: 'pointer' }}
                    >
                        ★
                    </span>
                ))}

                {/* Display Difficulty Level */}
                <DifficultyLevel timeInMins={selectedRecipe.timeInMins} />

                <div className="details">
                    <span>Tid: {selectedRecipe.timeInMins} minuter</span>
                    <span>Pris: {selectedRecipe.price} SEK</span>
                </div>
            </div>
        </>
    );
};

export default RecipeDetail;
