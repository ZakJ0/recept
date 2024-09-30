import React, { useEffect, useState } from 'react';

const RecipeList = ({ searchQuery }) => {
    const [recipes, setRecipes] = useState([]); // State to hold the recipes
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();

                // Filter recipes if searchQuery is provided
                const filteredRecipes = searchQuery
                    ? data.filter(recipe =>
                        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    : data;

                setRecipes(filteredRecipes); // Set the filtered data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchRecipes();
    }, [searchQuery]); // Re-fetch the data if searchQuery changes

    // Render loading, error, or data
    if (loading) {
        return <p>Laddar...</p>;
    }

    if (error) {
        return <p>Fel: {error}</p>;
    }

    return (
        <div>
            <h1>Recept</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <img src={recipe.imageUrl} alt={recipe.title} width="200" />
                        <p>Tid: {recipe.timeInMins} minuter</p>
                        <p>Pris: {recipe.price} SEK</p>

                        <h4>Kategorier:</h4>
                        <ul>
                            {recipe.categories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>

                        <h4>Ingredienser:</h4>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.amount} {ingredient.unit} av {ingredient.name}
                                </li>
                            ))}
                        </ul>

                        <h4>Instruktioner:</h4>
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
