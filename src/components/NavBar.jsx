<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/SingleRecipe">Kategorier</Link></li>
                <li><a href="#2">Teman</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
=======
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom';
import '../css/navbar.css';



const Navbar = () => {
    const [categories, setCategories] = useState([]); // State to hold the fetched categories

    // Fetch categories from the API when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data); // Set the fetched categories into the state
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Homepage</Link></li>

                {/* Dropdown for Categories */}
                <div className="dropdown">
                    <span className="category-List">Categories</span>
                    <div className="dropdown-content">
                        {categories.length === 0 ? (
                            <span>Loading...</span> // Show a loading message while categories are being fetched
                        ) : (
                            categories.map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/category/${category.name}`} // Use the actual category name in the URL
                                >
                                    {category.name}
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                <li><a href="#3">Kategori 3</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
>>>>>>> origin/master
