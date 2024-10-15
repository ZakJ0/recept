import React, { useEffect, useState } from 'react';
import './Comment.css';

const Comments = ({ recipeId }) => {
    const [comments, setComments] = useState([]); // Holds comments
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if form is submitted
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if form is being submitted

    // Fetch comments when the component mounts or recipeId changes
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();

                // Assume each comment has a unique id and created_at timestamp
                const formattedComments = data.map(comment => {
                    return { ...comment }; // Adjust this based on your API response
                });

                setComments(formattedComments);
            } catch (err) {
                setError(err.message);
            }
        };

        if (recipeId) {
            fetchComments();
        }
    }, [recipeId]);

    // Handle new comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        // Disable form while submitting
        setIsSubmitting(true);

        // Generate local date (only the date, no time)
        const localDate = new Date().toLocaleDateString('sv-SE'); // Format: yyyy-mm-dd

        try {
            const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the name with the date appended, and the comment separately
                body: JSON.stringify({ comment: newComment, name: `${localDate} ${name} ` }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const addedComment = await response.json();

            // Add the newly posted comment to the list
            setComments((prevComments) => [
                ...prevComments,
                { ...addedComment } // Include other properties as necessary
            ]);

            // Clear the input fields
            setNewComment('');
            setName('');

            // Set isSubmitted to true to show the thank you message
            setIsSubmitted(true);
        } catch (error) {
            setError(error.message);
        } finally {
            // Even though submission has finished, form will stay disabled due to isSubmitted
            setIsSubmitting(false);
        }
    };

    return (
        <div className="comments-section">
            <h3>Kommentarer</h3>
            {error && <p>Fel: {error}</p>}
            {comments.length === 0 ? (
                <p>Inga kommentarer än</p>
            ) : (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <strong>{comment.name}</strong>: {comment.comment}
                            <br />
                        </li>
                    ))}
                </ul>
            )}

            {/* Conditionally render the form or the thank you message */}
            {!isSubmitted ? (
                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <input
                        type="text"
                        placeholder="Ditt namn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isSubmitting} // Disable input while submitting
                    />
                    <textarea
                        placeholder="Lägg till en kommentar"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        disabled={isSubmitting} // Disable textarea while submitting
                    ></textarea>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Skickar...' : 'Skicka'}
                    </button>
                </form>
            ) : (
                <p>Tack för din kommentar!</p> // Thank you message after submission
            )}
        </div>
    );
};

export default Comments;