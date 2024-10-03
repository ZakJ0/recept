
import React, { useState } from 'react';
import '../css/App.css';
import SearchBar from '../components/SearchBar/SearchBar.jsx'; // Import the SearchBar component
import RecipeList from '../components/reciepeList/RecipeList.jsx'; // Import the RecipeList component
import Header from './Header';
// import NavBar from './NavBar';
import ItemContainer from './ItemContainer';


function App() {
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

    const handleSearch = (query) => {
        setSearchQuery(query); // Update the search query when the user searches
    };
    return (

        <div>
            <Header/>
            <SearchBar onSearch={handleSearch}/> {/* Pass the search handler to SearchBar */}
            <RecipeList searchQuery={searchQuery}/> {/* Pass the search query to RecipeList */}

    </div>
)
    ;
}

export default App;