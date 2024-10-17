
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/App.css';
import SearchBar from '../components/SearchBar/SearchBar.jsx'; // Import the SearchBar component
import Header from './Header';
import NavBar from '../components/NavBar';
import SingleRecipe from '../components/SingleRecipe.jsx';
import HomePage from '../components/HomePage/HomePage.jsx';


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
                <SearchBar onSearch={handleSearch}/> {/* Pass the search handler to SearchBar */}
                <HomePage searchQuery={searchQuery}/> {/* Pass the search query to RecipeList */}



                <Routes>
                    <Route path="/recipe/:id" element={<SingleRecipe />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;