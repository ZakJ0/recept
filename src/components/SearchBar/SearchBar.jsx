import React, { useState } from 'react';
import './search.css';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import RatingFilter from '../filters/RatingFilter.jsx';
import DifficultyFilter from '../filters/DifficultyFilter.jsx';
import ThemeFilter from '../filters/ThemeFilter.jsx';

const SearchBar = ({
                       onSearch,
                       onDifficultySelect,
                       onRatingSelect,
                       onThemeSelect,
                       selectedDifficulties,
                       selectedRatings,
                       selectedThemes,
                       availableThemes // Pass the available themes from HomePage
                   }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm); // Call the search function with the search term
        setSearchTerm(''); // Reset the search term
    };

    return (
        <div className="search-container">
            <HamburgerMenu />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sök efter kategori,receptnamn,ingredienser eller instruktioner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Sök</button>
            </form>

            <DifficultyFilter
                selectedDifficulties={selectedDifficulties}
                onSelectDifficulty={onDifficultySelect}
            />

            <RatingFilter
                selectedRatings={selectedRatings}
                onSelectRating={onRatingSelect}
            />

            <ThemeFilter
                selectedThemes={selectedThemes}
                onSelectTheme={onThemeSelect}
                availableThemes={availableThemes} // Pass available themes to ThemeFilter
            />
        </div>
    );
};

export default SearchBar;