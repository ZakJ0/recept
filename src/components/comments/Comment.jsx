import React, { useEffect, useState } from 'react';
import './Comment.css';

const Comments = ({ recipeId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();

                const formattedComments = data.map(comment => {
                    return { ...comment };
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedComment = newComment.trim();

        if (trimmedName === '') {
            setError('Fyll i ditt namn!');
            alert("Fyll i ditt namn!");
            return;
        }

        if (trimmedComment === '') {
            setError('Skriv en kommentar!');
            alert("Skriv en kommentar!");
            return;
        }

        setIsSubmitting(true);

        const localDate = new Date().toLocaleDateString('sv-SE'); // Format: yyyy-mm-dd

        try {
            const response = await fetch(`https://recept7-famul.reky.se/recipes/${recipeId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ comment: trimmedComment, name: `${localDate} ${trimmedName}` }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const addedComment = await response.json();

            setComments((prevComments) => [
                ...prevComments,
                { ...addedComment }
            ]);

            setNewComment('');
            setName('');
            setError(null);

            // Set isSubmitted to true to show the thank you message
            setIsSubmitted(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="comments-section">
            <h3>Kommentarer</h3>
            {error && <p className="error">Fel: {error}</p>}
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
