import React from 'react';
import './DifficultyLevel.css'; // Import the CSS file for difficulty styling

// Function to determine the difficulty level based on timeInMins
const getDifficulty = (timeInMins) => {
    if (timeInMins < 15) return '../images/easy.png';   // Image for easy difficulty
    if (timeInMins <= 30) return '../images/medium.png'; // Image for medium difficulty
    return '../images/hard.png';                         // Image for hard difficulty
};

// DifficultyLevel component
const DifficultyLevel = ({ timeInMins }) => {
    return (
        <span className="difficulty">
           <img
               src={getDifficulty(timeInMins)}
               alt="Difficulty level"
               style={{width: '50px', height: 'auto'}}
           />
        </span>
    );
};

export default DifficultyLevel;
