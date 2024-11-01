import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ resetSearch }) => {
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
                <li><Link to="/" onClick={resetSearch}>Hem</Link></li>
                <li className="dropdown" onClick={toggleDropdown}>
                    <span className="category-List">Kategorier</span>
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
                </li>
                <li className="right"><Link to="/aboutus">Om oss</Link></li> {/* Separat länk */}
            </ul>
        </nav>
    );
};

export default Navbar;
