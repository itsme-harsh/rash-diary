import React, { useState } from "react";

function FullScreen() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreenToggle = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <>
            <ul className="navbar-nav ml-auto mr-1">
                <li className="nav-item dropdown active">
                    <a 
                        className="nav-link dropdown-toggle position-relative" 
                        href="#"
                        onClick={handleFullscreenToggle}
                    >
                        <i className={`align-middle fas fa-${isFullscreen ? 'compress' : 'expand'}`}></i>
                    </a>
                </li>
            </ul>
        </>
    );
}

export default FullScreen;
