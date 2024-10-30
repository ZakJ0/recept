import React from 'react';
import './RatingFilter.css'
const RatingFilter = ({ selectedRatings, onSelectRating }) => {
    const ratings = [5, 4, 3]; // Available ratings

    const handleChange = (rating) => {
        if (selectedRatings.includes(rating)) {
            // If already selected, remove it
            onSelectRating(selectedRatings.filter(r => r !== rating));
        } else {
            // Otherwise, add it
            onSelectRating([...selectedRatings, rating]);
        }
    };

    const handleUnratedChange = () => {
        // Toggle the "Unrated" option
        if (selectedRatings.includes(null)) {
            onSelectRating(selectedRatings.filter(r => r !== null)); // Remove "Unrated"
        } else {
            onSelectRating([...selectedRatings, null]); // Add "Unrated"
        }
    };

    return (
        <div className="rating-filter">
            <strong>Betyg: </strong>
            {ratings.map((rating) => (
                <label key={rating} className="rating-label">
                    <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleChange(rating)}
                    />
                    <span className="rating-badge">{Array(rating).fill('★').join('')}</span> {/* Display stars based on rating */}
                </label>
            ))}

            <label className="rating-label">
                <input
                    type="checkbox"
                    checked={selectedRatings.includes(null)} // Check if "Unrated" is selected
                    onChange={handleUnratedChange}
                />
                <span className="rating-badge">Unrated</span> {/* Display "Unrated" option */}
            </label>

            <label className="rating-label">
                <input
                    type="checkbox"
                    checked={selectedRatings.length === 0}
                    onChange={() => onSelectRating([])} // Clear all ratings if "All" is checked
                />
                <span className="rating-badge">All Ratings</span>
            </label>
        </div>
    );
};

export default RatingFilter;