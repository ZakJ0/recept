import React, { useState } from 'react';
import './search.css';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import FilterDropdown from "../filters/FilterDropdown.jsx";

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
        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <div className="search-container">
            <HamburgerMenu/>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sök efter kategori, receptnamn, ingredienser eller instruktioner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-btn">Sök</button>

                <FilterDropdown
                    selectedDifficulties={selectedDifficulties}
                    onDifficultySelect={onDifficultySelect}
                    selectedRatings={selectedRatings}
                    onRatingSelect={onRatingSelect}
                    selectedThemes={selectedThemes}
                    onThemeSelect={onThemeSelect}
                    availableThemes={availableThemes}
                />
            </form>
        </div>

    );
};

export default SearchBar;
