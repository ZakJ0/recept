import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css'; // Custom CSS for RecipeDetail

const RecipeDetail = () => {
    const { recipeId } = useParams(); // Get recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0); // Rating for the specific recipe

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
                // Load the previously saved rating from local storage or initialize to 0
                const savedRating = localStorage.getItem(`rating-${recipeId}`) || 0;
                setRating(Number(savedRating));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    const handleRating = (ratingValue) => {
        setRating(ratingValue);
        localStorage.setItem(`rating-${recipeId}`, ratingValue); // Save the rating in local storage
    };

    if (loading) {
        return <p>Laddar...</p>;
    }

    if (error) {
        return <p>Fel: {error}</p>;
    }

    if (!recipe) {
        return <p>Recept hittades inte</p>;
    }

    return (
        <div className="recipe-detail">
            <h1>{recipe.title}</h1>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <p>{recipe.description}</p>

            <h3>Ingredienser:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                ))}
            </ul>

            <h3>Instruktioner:</h3>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>

            {/* Rating Section */}
            <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className={`star ${rating >= index + 1 ? 'filled' : ''}`}
                        onClick={() => handleRating(index + 1)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <div className="details">
                <span>Tid: {recipe.timeInMins} minuter</span>
                <span>Pris: {recipe.price} SEK</span>
            </div>
        </div>
    );
};

export default RecipeDetail;
