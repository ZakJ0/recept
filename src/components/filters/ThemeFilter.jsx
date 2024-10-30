import React from 'react';
import './ThemeFilter.css'
const ThemeFilter = ({ selectedThemes, onSelectTheme, availableThemes }) => {
    // Define the specific themes you want to show in the filter
    const allowedThemes = ['Ekofood', 'Junkfood', 'Speed-lunch', 'Fitnessmeal', 'Fredagsmys'];

    // Filter the available themes to only include the allowed themes
    const filteredThemes = availableThemes.filter(theme => allowedThemes.includes(theme));

    const handleChange = (theme) => {
        if (selectedThemes.includes(theme)) {
            onSelectTheme(selectedThemes.filter(t => t !== theme));
        } else {
            onSelectTheme([...selectedThemes, theme]);
        }
    };

    return (
        <div className="theme-filter">
            <strong>Teman: </strong>
            {filteredThemes.map((theme) => (
                <label key={theme} className="theme-label">
                    <input
                        type="checkbox"
                        checked={selectedThemes.includes(theme)}
                        onChange={() => handleChange(theme)}
                    />
                    <span className="theme-badge">{theme}</span>
                </label>
            ))}
        </div>
    );
};

export default ThemeFilter;