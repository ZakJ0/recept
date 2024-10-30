import React from 'react';
import './DifficultyFilter.css'
const DifficultyFilter = ({ selectedDifficulties, onSelectDifficulty }) => {
    const difficulties = ['Easy', 'Medium', 'Hard'];

    const handleChange = (difficulty) => {
        if (selectedDifficulties.includes(difficulty)) {
            onSelectDifficulty(selectedDifficulties.filter(d => d !== difficulty));
        } else {
            onSelectDifficulty([...selectedDifficulties, difficulty]);
        }
    };

    return (
        <div className="difficulty-filter">
            <strong>Svårighetsgrad: </strong>
            {difficulties.map((difficulty) => (
                <label key={difficulty} className="difficulty-label">
                    <input
                        type="checkbox"
                        checked={selectedDifficulties.includes(difficulty)}
                        onChange={() => handleChange(difficulty)}
                    />
                    <span className="difficulty-badge">{difficulty}</span>
                </label>
            ))}
        </div>
    );
};

export default DifficultyFilter;