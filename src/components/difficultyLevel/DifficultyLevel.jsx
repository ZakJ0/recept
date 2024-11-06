import React from 'react';
import './DifficultyLevel.css';

const getDifficulty = (timeInMins) => {
    if (timeInMins < 15) return '../images/easy.png';
    if (timeInMins <= 30) return '../images/medium.png';
    return '../images/hard.png'; 
};

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
