import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import '../css/navbar.css';


const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://recept7-famul.reky.se/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); 
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Homepage</Link></li>
                <div className="dropdown" onClick={toggleDropdown}>
                    <span className="category-List">Categories</span>
                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        {categories.length === 0 ? (
                            <span>Loading...</span>
                        ) : (
                            categories.map((category) => (
                                <Link key={category.name} to={`/category/${category.name}`}>
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
