import React from 'react';
import './RatingFilter.css'
const RatingFilter = ({ selectedRatings, onSelectRating }) => {
    const ratings = [5, 4, 3];

    const handleChange = (rating) => {
        if (selectedRatings.includes(rating)) {
            onSelectRating(selectedRatings.filter(r => r !== rating));
        } else {
            onSelectRating([...selectedRatings, rating]);
        }
    };

    const handleUnratedChange = () => {
        if (selectedRatings.includes(null)) {
            onSelectRating(selectedRatings.filter(r => r !== null));
        } else {
            onSelectRating([...selectedRatings, null]);
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
                    <span className="rating-badge">{Array(rating).fill('★').join('')}</span>
                </label>
            ))}

            <label className="rating-label">
                <input
                    type="checkbox"
                    checked={selectedRatings.includes(null)}
                    onChange={handleUnratedChange}
                />
                <span className="rating-badge">Unrated</span>
            </label>

            <label className="rating-label">
                <input
                    type="checkbox"
                    checked={selectedRatings.length === 0}
                    onChange={() => onSelectRating([])}
                />
                <span className="rating-badge">All Ratings</span>
            </label>
        </div>
    );
};

export default RatingFilter;