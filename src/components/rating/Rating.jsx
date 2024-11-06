import React, { useEffect, useState } from 'react';
import './Rating.css';


const Rating = ({ recipeId, ratingValue, isStatic = false, onRatingSubmit }) => {
    const [avgRating, setAvgRating] = useState(ratingValue || 0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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
                setAvgRating(recipeData.avgRating || 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAvgRating();
    }, [recipeId]);

    const submitRating = async (ratingValue) => {
        if (!recipeId || ratingValue === undefined || submitted) return;

        try {
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

            const updatedRecipeResponse = await fetch(
                `https://recept7-famul.reky.se/recipes/${recipeId}`
            );

            if (!updatedRecipeResponse.ok) {
                throw new Error('Failed to fetch updated recipe data');
            }

            const updatedRecipe = await updatedRecipeResponse.json();

            setAvgRating(updatedRecipe.avgRating || 0);
            setSubmitted(true); 
            onRatingSubmit();

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
                    onClick={() => !isStatic && submitRating(index + 1)}
                    style={{ cursor: isStatic || submitted ? 'default' : 'pointer' }}
                >
                    ★
                </span>
            ))}

            {submitted && <p>Tack för ditt betyg!</p>}
        </div>
    );
};

export default Rating;
