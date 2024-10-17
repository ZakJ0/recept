// RecipeDetail.jsx
import React from 'react';
import './RecipeDetail.css'; // Import the CSS file for styling the recipe details
import DifficultyLevel from '../difficultyLevel/DifficultyLevel.jsx';
import Rating from '../rating/Rating.jsx';
import Comments from "../comments/Comment.jsx";



const RecipeDetail = ({ selectedRecipe, closeDetails, ratings, handleRating }) => {
    if (!selectedRecipe) return null;


    return (
        <>
            <div className="overlay" onClick={closeDetails} /> {/* Close modal on overlay click */}
            <div className="recipe-details">
                <button className="close-button" onClick={closeDetails}>✖</button>
                {/* Close button */}
                <h2>{selectedRecipe.title}</h2>
                <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} style={{maxWidth: '200px'}}/>
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
                        <h3>Gör så här:</h3>
                        <ol>
                            {selectedRecipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="rating-difficulty-section">
                    {/* Use the Rating component for the detailed view */}
                    <Rating
                        recipeId={selectedRecipe._id}
                        ratingValue={ratings[selectedRecipe._id]} // Current rating
                        handleRating={false} // Pass the handleRating function for interactivity
                    />

                    {/* Display Difficulty Level */}
                    <DifficultyLevel timeInMins={selectedRecipe.timeInMins}/>
                </div>

                <div className="details">
                    <span>Tid: {selectedRecipe.timeInMins} minuter</span>
                    <span>Pris: {selectedRecipe.price} SEK</span>
                </div>
                {/* Comments section */}
                <Comments recipeId={selectedRecipe._id} />
            </div>
        </>
    );
};

export default RecipeDetail;