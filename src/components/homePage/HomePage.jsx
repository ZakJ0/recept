import React, { useEffect, useState } from 'react';
import './HomePage.css';
import RecipeDetail from '../RecipeDetail/RecipeDetail.jsx';
import RecipeCard from "../RecipeCard/RecipeCard.jsx";

const getDifficultyLevel = (timeInMins) => {
    if (timeInMins < 15) return 'Easy';
    if (timeInMins <= 30) return 'Medium';
    return 'Hard';
};

const HomePage = ({ searchQuery, selectedDifficulties, selectedRatings, selectedThemes }) => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
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

    useEffect(() => {
        // Filter recipes based on search term and selected filters
        const applyFilters = () => {
            const filtered = recipes.filter((recipe) => {
                // Check for matches in title, categories, ingredients, and instructions
                const matchesSearchTerm =
                    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    recipe.categories.some((category) =>
                        category.toLowerCase().includes(searchQuery.toLowerCase())
                    ) ||
                    recipe.ingredients.some((ingredient) =>
                        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ) ||
                    recipe.instructions.some((instruction) =>
                        instruction.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                const difficultyLevel = getDifficultyLevel(recipe.timeInMins);
                const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(difficultyLevel);

                const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(recipe.avgRating);

                const matchesThemes = selectedThemes.length === 0 || recipe.categories.some(category =>
                    selectedThemes.includes(category)
                );

                return matchesSearchTerm && matchesDifficulty && matchesRating && matchesThemes;
            });
            setFilteredRecipes(filtered);
        };

        applyFilters();
    }, [searchQuery, selectedDifficulties, selectedRatings, selectedThemes, recipes]);

    // Close recipe details and reload the page
    const closeDetails = () => {
        setSelectedRecipe(null);
        window.location.reload();  // Reload the page when closing the details
    };

    if (loading) return <p>Laddar...</p>;
    if (error) return <p>Fel: {error}</p>;
    if (filteredRecipes.length === 0) return <p>Inga recept hittades</p>;

    return (
        <div className="home-page">
            <div className="recipe-list">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        showRecipeDetails={() => setSelectedRecipe(recipe)}
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

export default HomePage;
