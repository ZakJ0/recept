import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './HamburgerMenu.css'

const HamburgerMenu = ({resetSearch}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setCategoriesOpen(false);
    };

    const closeOnClick = () => {
        setIsOpen(false);
    }

    const returnHomeOnClick = () => {
        closeOnClick();
        resetSearch();
    }

    // Hämta kategorier
    const fetchCategories = async () => {
        setLoading(true);
        setError(null); // Nollställ eventuell tidigare error
        try {
            const response = await fetch('https://recept7-famul.reky.se/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Hantera klick på "Kategorier" för att visa/hämta kategorier
    const handleCategoriesClick = () => {
        if (!categoriesOpen) {
            fetchCategories();
        }
        setCategoriesOpen(!categoriesOpen);
    };

    return (
        <div>
            <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {isOpen && (
                <div className={`side-menu ${isOpen ? 'side-menu-open' : ''}`}>
                    <div className="close-icon" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                        <ul>      
                            <li><Link to="/" onClick={returnHomeOnClick}>Hem</Link></li>

                            <li onClick={handleCategoriesClick} className="categories-item">
                                Kategorier {categoriesOpen ? '-' : '+'}
                            </li>
                            {categoriesOpen && (
                                <ul className="categories-submenu">
                                    {loading && <li>Laddar...</li>}
                                    {error && <li>{error}</li>}
                                    {!loading && !error && categories.map((category) => (
                                        <li key={category.name}>
                                            <Link to={`/category/${category.name}`} onClick={closeOnClick}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <li><Link to="/aboutus" onClick={closeOnClick}>Om oss</Link></li>
                        </ul>
                </div>
            )}
        </div>
    );

};

export default HamburgerMenu;