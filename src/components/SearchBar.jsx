import React from 'react';
import '../css/search.css'; // Import the CSS file

const SearchBar = () => {
    return (
        <div className="search-container">
            <form>
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};


export default SearchBar;
