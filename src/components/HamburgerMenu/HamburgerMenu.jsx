import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';
import '../SearchBar/search.css';

const HamburgerMenu = ({ resetSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    /*
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    */

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setCategoriesOpen(false);
    };

    const closeOnClick = () => {
        setIsOpen(false);
    };

    /*
    const returnHomeOnClick = () => {
        closeOnClick();
        resetSearch();
    }
    */

    const fetchCategories = async () => {
        setLoading(true);
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
            
                <div className="filterExpansion">
                    <h4>Filtrera efter svårighetsgrad</h4>

                </div>
                
            )}
        </div>
    );
};

export default HamburgerMenu;
