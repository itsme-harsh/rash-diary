import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomDropdown = ({ options, value, onChange, label, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedValue(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown">
            <label className="custom-dropdown-label">{label}</label>
            <div
                className={`custom-dropdown-select ${isOpen ? 'open' : ''} ${error ? 'error' : ''}`}
                onClick={toggleDropdown}
                tabIndex={0}
            >
                <div className="selected-value">{selectedValue || 'Select an Option'}</div>
                <div className="arrow">&#9662;</div>
            </div>
            {isOpen && (
                <div className="custom-dropdown-options">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="custom-dropdown-option"
                            onClick={() => handleOptionClick(option.label)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

CustomDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default CustomDropdown;
