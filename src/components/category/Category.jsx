import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import './Category.css';
import RecipeDetail from "../RecipeDetail/RecipeDetail.jsx";

const Categories = () => {
    const { categoryName } = useParams(); // Get the categoryName from the URL
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ratings, setRatings] = useState({});

    // Fetch recipes function
    const fetchRecipes = async () => {
        setLoading(true); // Set loading to true before fetching new data
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
            setLoading(false); // Set loading to false after fetching is done
        }
    };

    useEffect(() => {
        fetchRecipes(); // Initial load
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const closeDetails = () => {
        setSelectedRecipe(null);
    };

    const showRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe);
    };

    // Filter recipes by category
    const filteredRecipes = recipes.filter(recipe =>
        recipe.categories.some(category => category.toLowerCase() === categoryName.toLowerCase())
    );

    if (filteredRecipes.length === 0) return <p>No recipes found for this category.</p>;

    return (
        <div className="category-page">
            <h2>Category: {categoryName}</h2> {/* Add title with the selected category */}

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
                    />
                )}
            </div>
        </div>
    );
};

export default Categories;
