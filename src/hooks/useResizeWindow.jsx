import { useState, useEffect } from "react";

export default function useResizeWindow() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 500);
        }
        
        window.addEventListener("resize", handleResize);

        // Cleanup to prevent memory leaks
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array ensures this runs only once (on mount)

    return windowWidth;
}