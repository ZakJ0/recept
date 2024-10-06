import React from 'react';
import './DifficultyLevel.css'; // Import the CSS file for difficulty styling

// Function to determine the difficulty level based on timeInMins
const getDifficulty = (timeInMins) => {
    if (timeInMins < 15) return 'easy';   // Image for easy difficulty
    if (timeInMins <= 30) return 'medium'; // Image for medium difficulty
    return 'hard';                         // Image for hard difficulty
};

// DifficultyLevel component
const DifficultyLevel = ({ timeInMins }) => {
    return (
        <span className="difficulty">
            {getDifficulty(timeInMins)}
        </span>
    );
};

export default DifficultyLevel;
