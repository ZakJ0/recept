import React, { useEffect, useState } from 'react';
import './Rating.css'; // Include the CSS for the rating stars

const Rating = ({ recipeId, ratingValue, isStatic = false, onRatingSubmit }) => {
    const [avgRating, setAvgRating] = useState(ratingValue || 0); // Default to passed rating value
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [disabled, setDisabled] = useState(false); // New state to disable rating interaction

    // Fetch the average rating when the component mounts or when recipeId changes
    useEffect(() => {
        if (!recipeId) {
            setError('Invalid recipe ID');
            return;
        }

        const fetchAvgRating = async () => {
            try {
                const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch average rating');
                }

                const recipeData = await response.json();
                setAvgRating(recipeData.avgRating || 0); // Use avgRating from API or default to 0
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAvgRating();
    }, [recipeId]);

    // Handle rating submission
    const submitRating = async (ratingValue) => {
        if (!recipeId || ratingValue === undefined) return; // If no recipeId or rating, exit

        // Check if the user has already rated and display an alert if they try to rate again
        if (submitted) {
            alert('Du har redan lagt ett betyg!'); // Alert the user
            return;
        }

        try {
            // Optimistically update the rating
            setAvgRating(ratingValue);
            setDisabled(true); // Disable further interaction

            // Post the new rating
            const response = await fetch(
                `https://recept7-famul.reky.se/recipes/${recipeId}/ratings`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rating: ratingValue }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            // Fetch updated average rating after the submission
            const updatedRecipeResponse = await fetch(
                `https://recept7-famul.reky.se/recipes/${recipeId}`
            );

            if (!updatedRecipeResponse.ok) {
                throw new Error('Failed to fetch updated recipe data');
            }

            const updatedRecipe = await updatedRecipeResponse.json();

            // Set the new average rating from the API response
            setAvgRating(updatedRecipe.avgRating || 0);
            setSubmitted(true); // Mark as submitted
            onRatingSubmit();  // Notify parent about rating submission
        } catch (err) {
            setError(err.message);
            console.error('Error submitting rating:', err);
        }
    };

    if (loading) {
        return <p>Loading rating...</p>;
    }

    if (error) {
        return <p>Failed to load rating: {error}</p>;
    }

    return (
        <div className="rating-section">
            {/* Show average rating stars (if static) or let the user select rating (if dynamic) */}
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`star ${avgRating >= index + 1 ? 'filled' : ''}`}
                    onClick={() => !isStatic && !disabled && submitRating(index + 1)} // Allow click if not static or disabled
                    style={{ cursor: isStatic || disabled ? 'default' : 'pointer' }} // Disable pointer if static or disabled
                >
                    ★
                </span>
            ))}

            {submitted && <p>Tack för ditt betyg!</p>}
        </div>
    );
};

export default Rating;
