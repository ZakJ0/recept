import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ resetSearch }) => {
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);             // Lagt till state för loading
    const [error, setError] = useState(null);                  // Lagt till state för error

    useEffect(() => {
        const ignoredCategories = ['Ekofood', 'Fredagsmys', 'Speed-lunch', 'Junkfood', 'Fitnessmeal'];

        const fetchCategories = async () => {
            setLoading(true);                                   // Sätter loading till true innan vi börjar hämta data
            setError(null);                                      // Återställer error till null
            try {
                const response = await fetch('https://recept7-famul.reky.se/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                const filteredCategories = data.filter(category => !ignoredCategories.includes(category.name));
                setCategories(filteredCategories);
            } catch (err) {
                setError(err.message);                           // Sätter error-meddelande om det uppstår ett fel
            } finally {
                setLoading(false);                               // Sätter loading till false när hämtningen är klar
            }
        };

        fetchCategories(); // Kör hämtningen när komponenten laddas
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); 
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/" onClick={resetSearch}>Hem</Link></li>
                <li className="dropdown" onClick={toggleDropdown}>
                    <span className="category-list">Kategorier</span>
                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        {loading && <span>Loading...</span>}          {/* Visar "Loading..." om laddningen pågår */}
                        {error && <span>{error}</span>}               {/* Visar felmeddelande om ett fel inträffade */}
                        {!loading && !error && categories.map((category) => (
                            <Link key={category.name} to={`/category/${category.name}`} onClick={() => setIsDropdownOpen(false)}>
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </li>
                <li className="right"><Link to="/aboutus">Om oss</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
