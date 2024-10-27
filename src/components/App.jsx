
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/App.css';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import Header from './Header';
import NavBar from '../components/NavBar';
import HomePage from '../components/homePage/HomePage.jsx';
import Categories from '../components//category/Category.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    
    const resetSearch = () => {
     setSearchQuery('');   
    }

    return (
        <Router>
            <div>
                <Header />
                {/* <NavBar resetSearch={resetSearch}/> */}
                <SearchBar onSearch={handleSearch}/> {/* Pass the search handler to SearchBar */}
                <Routes>
                    <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
                    <Route path='/aboutus' element={<AboutUs/>}/>
                    <Route path="/category/:categoryName" element={<Categories />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;