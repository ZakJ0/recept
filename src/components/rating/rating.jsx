import React from 'react';
import './Rating.css'; // Include the CSS for the rating stars

const Rating = ({ recipeId, ratingValue, handleRating, isStatic = false }) => {
    return (
        <div className="rating-section">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`star ${ratingValue >= index + 1 ? 'filled' : ''}`}
                    onClick={() => !isStatic && handleRating(recipeId, index + 1)} // Only allow clicking if it's not static
                    style={{ cursor: isStatic ? 'default' : 'pointer' }} // Disable pointer for static stars
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;
