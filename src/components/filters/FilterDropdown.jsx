import React, { useState } from 'react';
import DifficultyFilter from './DifficultyFilter';
import RatingFilter from './RatingFilter';
import ThemeFilter from './ThemeFilter';
import './FilterDropdown.css';

const FilterDropdown = ({
                            selectedDifficulties,
                            onDifficultySelect,
                            selectedRatings,
                            onRatingSelect,
                            selectedThemes,
                            onThemeSelect,
                            availableThemes
                        }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="filter-dropdown">
            <button className="filter-button" onClick={toggleDropdown}>
                {isOpen ? 'Close Filters' : 'Open Filters'}
            </button>

            {isOpen && (
                <div className="filter-content">
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
                        availableThemes={availableThemes}
                    />
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
