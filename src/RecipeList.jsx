import React, { useEffect, useState } from 'react';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]); // State to hold the recipes
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State for error handling

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();
                setRecipes(data); // Set the fetched data to state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchRecipes();
    }, []); // Empty dependency array means this runs once when the component mounts

    // Render loading, error, or data
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <img src={recipe.imageUrl} alt={recipe.title} width="200" />
                        <p>Time: {recipe.timeInMins} minutes</p>
                        <p>Price: {recipe.price} SEK</p>

                        {/* Categories Section */}
                        <h4>Categories:</h4>
                        <ul>
                            {recipe.categories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>

                        {/* Ingredients Section */}
                        <h4>Ingredients: 1 portion</h4>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.amount} {ingredient.unit} av {ingredient.name}
                                </li>
                            ))}
                        </ul>

                        {/* Instructions Section */}
                        <h4>Instructions:</h4>
                        <ol>
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
