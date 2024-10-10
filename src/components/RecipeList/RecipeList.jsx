import React, { useEffect, useState } from 'react';
import './RecipeList.css'; // Include the CSS for styling
import RecipeDetail from '../RecipeDetail/RecipeDetail.jsx';
import RecipeCard from "../RecipeCard/RecipeCard.jsx";

// Reusable components for common parts
const Loading = () => <p>Laddar...</p>;
const Error = ({ message }) => <p>Fel: {message}</p>;
const NoRecipes = () => <p>Inga recept hittades</p>;


const RecipeList = ({ searchQuery }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({});
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();

                const initialRatings = data.reduce((acc, recipe) => {
                    acc[recipe._id] = recipe.avgRating || 0;
                    return acc;
                }, {});

                setRecipes(data);
                setRatings(initialRatings);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleRating = async (recipeId, ratingValue) => {
        if (!recipeId) {
            console.error('Error: recipeId is undefined');
            return;
        }

        setRatings((prevRatings) => ({
            ...prevRatings,
            [recipeId]: ratingValue,
        }));

        try {
            const response = await fetch(
                `https://recept7-famul.reky.se/recipes/${recipeId}/ratings`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: '*/*',
                    },
                    body: JSON.stringify({ rating: ratingValue }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error posting rating:', error);
        }
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.categories.some((category) =>
            category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const showRecipeDetails = (recipe) => setSelectedRecipe(recipe);
    const closeDetails = () => setSelectedRecipe(null);

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;
    if (filteredRecipes.length === 0) return <NoRecipes />;

    return (
        <div className="recipe-list">
            {filteredRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    showRecipeDetails={showRecipeDetails}
                />
            ))}

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

