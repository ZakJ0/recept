import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './RecipeForm.css';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        name: '',
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        time: '',
        price: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send(
            'service_s9wbvpc',
            'template_b1awn9f',
            {
                firstName: formData.firstName,
                name: formData.name,
                title: formData.title,
                description: formData.description,
                ingredients: formData.ingredients,
                instructions: formData.instructions,
                time: formData.time,
                price: formData.price
            },
            'IXCYujiMggFP_X5vT'
        )
            .then((response) => {
                console.log('Recipe submitted successfully!', response.status, response.text);
                setSuccessMessage("Recipe submitted successfully!");
                setError(null);
            })
            .catch((err) => {
                console.error('Failed to submit recipe:', err);
                setError("Failed to submit recipe. Please try again.");
            });
    };

    return (
        <form onSubmit={sendEmail}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Förnamn"
                   required/>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Efternamn"
                   required/>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titel"
                   required/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Beskrivning"
                      required/>
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredienser"
                      required/>
            <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Gör så här"
                      required/>
            <input type="number" name="time" value={formData.time} onChange={handleChange} placeholder="tid (i min)"
                   required/>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Pris (i SEK)"
                   required/>
            <button type="submit">Skicka</button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </form>
    );
};

export default RecipeForm;
