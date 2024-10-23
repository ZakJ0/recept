import React, { useState } from 'react';
import './search.css';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const SearchBar = ({ onSearch, resetSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        // Call the parent function to update the search term in the main component
        onSearch(searchTerm);

        // Clear the search input field after submission
        setSearchTerm('');

        // Call the parent function to update the search term in the main component
        onSearch(searchTerm);

        // Clear the search input field after submission
        setSearchTerm('');
    };

    return (
        <div className="search-container">
            <div className="hamburger-menu">
                <HamburgerMenu resetSearch={resetSearch}/>
            </div>
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