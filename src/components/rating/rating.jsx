import React, { useEffect, useState } from 'react';
import './Rating.css';

const Rating = ({ recipeId, ratingValue, isStatic = false, onRatingSubmit }) => {
    const [avgRating, setAvgRating] = useState(ratingValue || 0); // Default to passed rating value
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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
        if (!recipeId || ratingValue === undefined || submitted) return; // Exit if already submitted

        try {
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
            onRatingSubmit(); // Call the function to indicate rating submitted

        } catch (err) {
            setError(err.message);
            console.error('Error submitting rating:', err);
        }
    };

    if (loading) {
        return <p>Loading rating...</p>;
    }

    if (error) {
        console.error('Error fetching or submitting rating:', error);
        return <p>Failed to load rating: {error}</p>;
    }

    return (
        <div className="rating-section">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`star ${avgRating >= index + 1 ? 'filled' : ''}`}
                    onClick={() => !isStatic && submitRating(index + 1)} // Allow click if not static
                    style={{ cursor: isStatic || submitted ? 'default' : 'pointer' }} // Disable pointer if already submitted
                >
                    ★
                </span>
            ))}

            {submitted && <p>Tack för ditt betyg!</p>}
        </div>
    );
};

export default Rating;
