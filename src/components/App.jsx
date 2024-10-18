import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/App.css';
import SearchBar from '../components/SearchBar/SearchBar.jsx'; // Import the SearchBar component
import Header from './Header';
import NavBar from '../components/NavBar';
import SingleRecipe from '../components/SingleRecipe.jsx';
import HomePage from '../components/homePage/HomePage.jsx';
import Categories from '../components/category/Category.jsx'; // Adjusted path if necessary

function App() {
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

    const handleSearch = (query) => {
        setSearchQuery(query); // Update the search query when the user searches
    };

    return (
        <Router>
            <div>
                <Header />
                <NavBar />
                {/* SearchBar should be available globally */}
                <SearchBar onSearch={handleSearch} /> {/* Pass the search handler to SearchBar */}

                {/* Define your Routes */}
                <Routes>
                    {/* Homepage route */}
                    <Route path="/" element={<HomePage searchQuery={searchQuery} />} />

                    {/* Category page route: This will only display the Category component */}
                    <Route path="/category/:categoryName" element={<Categories />} />

                    {/* Single recipe route */}
                    <Route path="/recipe/:id" element={<SingleRecipe />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
