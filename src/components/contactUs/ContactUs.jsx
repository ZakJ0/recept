import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        name: '',
        description: '',
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
                description: formData.description,
            },
            'IXCYujiMggFP_X5vT'
        )
            .then((response) => {
                console.log('Form submitted successfully!', response.status, response.text);
                setSuccessMessage("Form submitted successfully!");
                setError(null);
            })
            .catch((err) => {
                console.error('Failed to submit form:', err);
                setError("Failed to submit form. Please try again.");
            });
    };

    return (
        <form onSubmit={sendEmail}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Förnamn"
                   required/>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Efternamn"
                   required/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Vad kan vi hjälpa dig med?"
                      required/>
            <button type="submit">Skicka</button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </form>
    );
};

export default ContactUs;
