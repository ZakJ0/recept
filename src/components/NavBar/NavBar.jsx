import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ resetSearch }) => {
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
    const ignoredCategories = ['Ekofood', 'Fredagsmys', 'Speed-lunch', 'Junkfood', 'Fitnessmeal'];

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://recept7-famul.reky.se/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            const filteredCategories = data.filter(category => !ignoredCategories.includes(category.name));
            setCategories(filteredCategories);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
