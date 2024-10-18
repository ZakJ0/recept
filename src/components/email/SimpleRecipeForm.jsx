import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SimpleRecipeForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        description: '',
        timeInMins: '',
        price: '',
        categories: '',
        instructions: '',
        ingredients: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace with your EmailJS service ID, template ID, and user ID
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
            .then((result) => {
                alert('Email sent successfully!');
            }, (error) => {
                console.error('Failed to send email:', error.text);
            });

        e.target.reset();  // Reset form after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit Your Recipe</h2>

            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
                <label>Recipe Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>

            <div>
                <label>Time (Minutes):</label>
                <input type="number" name="timeInMins" value={formData.timeInMins} onChange={handleChange} required />
            </div>

            <div>
                <label>Price (SEK):</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            <div>
                <label>Categories (comma separated):</label>
                <input type="text" name="categories" value={formData.categories} onChange={handleChange} required />
            </div>

            <div>
                <label>Ingredients (comma separated):</label>
                <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
            </div>

            <div>
                <label>Instructions:</label>
                <textarea name="instructions" value={formData.instructions} onChange={handleChange} required />
            </div>

            <button type="submit">Send Recipe</button>
        </form>
    );
};

export default SimpleRecipeForm;
