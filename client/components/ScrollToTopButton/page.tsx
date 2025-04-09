"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-20 right-16 max-md:right-4 max-md:bottom-4 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-bg_black border border-[#FCF961] text-white hover:text-black p-3 rounded-full shadow-md hover:bg-[#FCF961] transition-colors w-12 h-12 flex items-center justify-center"
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton; 