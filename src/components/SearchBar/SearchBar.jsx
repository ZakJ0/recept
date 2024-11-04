import React, { useState } from 'react';
import './search.css';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import FilterDropdown from "../filters/FilterDropdown.jsx";
// Import the new FilterDropdown component

const SearchBar = ({
                       onSearch,
                       onDifficultySelect,
                       onRatingSelect,
                       onThemeSelect,
                       selectedDifficulties,
                       selectedRatings,
                       selectedThemes,
                       availableThemes
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
                    placeholder="Sök efter kategori, receptnamn, ingredienser eller instruktioner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Sök</button>
            </form>

            {/* Use FilterDropdown instead of individual filters */}
            <FilterDropdown
                selectedDifficulties={selectedDifficulties}
                onDifficultySelect={onDifficultySelect}
                selectedRatings={selectedRatings}
                onRatingSelect={onRatingSelect}
                selectedThemes={selectedThemes}
                onThemeSelect={onThemeSelect}
                availableThemes={availableThemes}
            />
        </div>
    );
};

export default SearchBar;
