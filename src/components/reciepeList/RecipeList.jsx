import React, { useEffect, useState } from 'react';
import './RecipeList.css'; // Include the CSS for styling
import DifficultyLevel from '../difficultyLevel/DifficultyLevel.jsx';
import RecipeDetail from '../recipeDetail/RecipeDetail.jsx'; // Import the RecipeDetail component

const RecipeList = ({ searchQuery }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({}); // Store ratings for each recipe
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold the selected recipe for details

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();

                // Initialize ratings with avgRating values from the API
                const initialRatings = data.reduce((acc, recipe) => {
                    acc[recipe._id] = recipe.avgRating || 0; // Use avgRating from the API, default to 0 if not present
                    return acc;
                }, {});

                setRecipes(data); // Set the fetched recipes
                setRatings(initialRatings); // Set initial ratings based on fetched data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Handle ratings for recipes in the detailed view (not on the main page)
    const handleRating = async (recipeId, ratingValue) => {
        console.log(`Submitting rating for recipeId: ${recipeId} with rating: ${ratingValue}`);

        // Check if recipeId is undefined
        if (!recipeId) {
            console.error('Error: recipeId is undefined');
            return;
        }

        // Optimistically update the local rating for the current recipe
        setRatings((prevRatings) => ({
            ...prevRatings,
            [recipeId]: ratingValue,
        }));

        try {
            // Send the rating to the backend
            const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}/ratings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
                body: JSON.stringify({ rating: ratingValue }), // Send the new rating value
            });

            // Check if response is OK
            if (!response.ok) {
                // Log the error if response is not OK
                console.error('Failed to submit rating. Status:', response.status);
                throw new Error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error posting rating:', error);
        }
    };

    // Filter recipes based on searchQuery (by title and categories)
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.categories.some((category) =>
            category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Show recipe details for the selected recipe
    const showRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe);
    };

    // Close the details view
    const closeDetails = () => {
        setSelectedRecipe(null);
    };

    if (loading) {
        return <p>Laddar...</p>;
    }

    if (error) {
        return <p>Fel: {error}</p>;
    }

    if (filteredRecipes.length === 0) {
        return <p>Inga recept hittades</p>; // No recipes found
    }

    return (
        <div className="recipe-list">
            {filteredRecipes.map((recipe) => (
                <div key={recipe._id} className="recipe">
                    {/* Clicking on the image opens the details */}
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        onClick={() => showRecipeDetails(recipe)}
                        style={{ cursor: 'pointer' }} // Change cursor to indicate clickable image
                    />
                    <div className="recipe-content">
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>

                        {/* Rating Section (static, non-clickable) */}
                        <div className="rating">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span
                                    key={index}
                                    className={`star ${recipe.avgRating >= index + 1 ? 'filled' : ''}`} // Use recipe.avgRating here
                                    style={{ cursor: 'default' }} // Ensure stars on the main page are not clickable
                                >
                                    ★
                                </span>
                            ))}

                            {/* Display Difficulty Level */}
                            <DifficultyLevel timeInMins={recipe.timeInMins} />
                        </div>
                    </div>

                    <div className="details">
                        <span>Tid: {recipe.timeInMins} minuter</span>
                        <span>Pris: {recipe.price} SEK</span>
                    </div>
                </div>
            ))}

            {/* Render RecipeDetail component if a recipe is selected */}
            {selectedRecipe && (
                <RecipeDetail
                    selectedRecipe={selectedRecipe}
                    closeDetails={closeDetails}
                    ratings={ratings}
                    handleRating={handleRating}
                />
            )}
        </div>
    );
};

export default RecipeList;
