import React, { useState } from 'react';
import './search.css'; // Import your custom CSS if needed

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        onSearch(searchTerm); // Call the parent function to filter recipes
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sök efter kategori eller recept..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                />
                <button type="submit">Sök</button>
            </form>
        </div>
    );
};

export default SearchBar;
