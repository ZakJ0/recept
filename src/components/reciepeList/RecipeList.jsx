import React, { useEffect, useState } from 'react';
import './RecipeList.css'; // Include the CSS for styling

const RecipeList = ({ searchQuery }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({}); // Store ratings for each recipe

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();

                const filteredRecipes = searchQuery
                    ? data.filter(recipe =>
                        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    : data;

                setRecipes(filteredRecipes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [searchQuery]);

    const handleRating = (recipeId, ratingValue) => {
        setRatings({ ...ratings, [recipeId]: ratingValue });
    };

    if (loading) {
        return <p>Laddar...</p>;
    }

    if (error) {
        return <p>Fel: {error}</p>;
    }

    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe">
                    <img src={recipe.imageUrl} alt={recipe.title} />
                    <div className="recipe-content">
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>

                        {/* Rating Section */}
                        <div className="rating">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span
                                    key={index}
                                    className={`star ${ratings[recipe.id] >= index + 1 ? 'filled' : ''}`}
                                    onClick={() => handleRating(recipe.id, index + 1)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="details">
                        <span>Tid: {recipe.timeInMins} minuter</span>
                        <span>Pris: {recipe.price} SEK</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
