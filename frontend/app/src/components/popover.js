import React, { useState, useEffect } from "react";

const Popover = ({ species, onClose }) => {
    const [error, setError] = useState("");

    // Generate Wolfram Alpha URL for the species
    const getWolframImageUrl = (species) => {
        if (!species) return "";
        const formattedSpecies = species.split(" ").join("+");
        return `http://api.wolframalpha.com/v1/simple?appid=9QJ52J-AWQ26Q4U9X&i=${formattedSpecies}%3F`;
    };

    return (
        <div className="popover-container">
            <div className="popover-content">
                <h3>Wolfram Alpha Information</h3>
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div>
                        {/* Display Wolfram Alpha Image for the species */}
                        {species && (
                            <div className="wolfram-image">
                                <img
                                    src={getWolframImageUrl(species)}
                                    alt="Species Image"
                                    className="species-image"
                                />
                            </div>
                        )}
                    </div>
                )}
                <button onClick={onClose} className="pclose-button">Close</button>
            </div>
        </div>
    );
};

export default Popover;
