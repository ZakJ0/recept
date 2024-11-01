import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import '../css/App.css';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import Header from '../components/Header/Header.jsx';
import NavBar from '../components/NavBar/NavBar.jsx';
import HomePage from '../components/homePage/HomePage.jsx';
import Categories from '../components/category/Category.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
import Footer from './Footer/Footer.jsx';
import RecipeForm from "./recipeForm/RecipeForm.jsx";

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [availableThemes, setAvailableThemes] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleDifficultySelect = (difficulties) => {
        setSelectedDifficulties(difficulties);
    };

    const handleRatingSelect = (ratings) => {
        setSelectedRatings(ratings);
    };

    const handleThemeSelect = (themes) => {
        setSelectedThemes(themes);
    };

    const resetSearch = () => {
        setSearchQuery('');
        setSelectedDifficulties([]);
        setSelectedRatings([]);
        setSelectedThemes([]);
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();

                // Extract unique categories (themes) from the recipes data
                const uniqueThemes = [...new Set(data.flatMap(recipe => recipe.categories))];
                setAvailableThemes(uniqueThemes); // Set the available themes
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <Router>
            <div>
                <Header/>
                <NavBar resetSearch={resetSearch}/>
                
                
                <SearchBar
                    onSearch={handleSearch}
                    onDifficultySelect={handleDifficultySelect}
                    onRatingSelect={handleRatingSelect}
                    onThemeSelect={handleThemeSelect}
                    selectedDifficulties={selectedDifficulties}
                    selectedRatings={selectedRatings}
                    selectedThemes={selectedThemes}
                    availableThemes={availableThemes}
                />
                

                <Routes>
                    <Route path="/" element={<HomePage
                        searchQuery={searchQuery}
                        selectedDifficulties={selectedDifficulties}
                        selectedRatings={selectedRatings}
                        selectedThemes={selectedThemes}
                    />}/>
                    <Route path='/aboutus' element={<AboutUs/>}/>
                    <Route path="/category/:categoryName" element={<Categories/>}/>
                    <Route path="/send-recipe" element={<RecipeForm/>}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
