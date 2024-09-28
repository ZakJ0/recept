
import './App.css'
//import React from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component
import RecipeList from "./RecipeList.jsx";

function App() {
    return (
        <div>
            <h1>Välkommen till receptsidan</h1>
            <SearchBar /> {/* Use the SearchBar component */}
            <RecipeList></RecipeList>
        </div>
    );
}

export default App;
