"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMobile, setIsMobile] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Check screen width for responsive layout
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Mobile if < 768px (MD breakpoint)
        };
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        
        checkScreenSize();
        handleScroll(); // Initial check
        
        window.addEventListener("resize", checkScreenSize);
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("resize", checkScreenSize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Load theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    // Toggle Dark Mode
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    // Navigation Links
    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Gallery", href: "#gallery" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Contact", href: "#contact" },
    ];
    
    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 sm:top-5 left-0 sm:left-1/2 w-full sm:w-auto sm:transform sm:-translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 
            ${scrolled 
                ? "bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-md" 
                : "bg-white/40 dark:bg-gray-900/40 backdrop-blur-md"
            } 
            ${isMobile ? "rounded-none" : "rounded-full"}
            border border-transparent dark:border-white/20 flex items-center justify-between sm:justify-center space-x-2 sm:space-x-6`}
        >
            {/* Mobile Menu Button (Only for small screens) */}
            {isMobile && (
                <button
                    className="text-gray-800 dark:text-gray-200 p-1"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            {/* Navigation Links - Desktop */}
            {!isMobile && (
                <div className="flex space-x-4 sm:space-x-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group relative text-gray-800 dark:text-gray-200 font-medium transition hover:text-indigo-500 px-1 py-1"
                            onClick={handleLinkClick}
                        >
                            {item.name}
                            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>
            )}

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                aria-label="Toggle Dark Mode"
            >
                {theme === "light" ? (
                    <Moon size={20} className="text-gray-800" />
                ) : (
                    <Sun size={20} className="text-yellow-400" />
                )}
            </button>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-12 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg p-4 z-50 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex flex-col items-center space-y-4 py-2">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-800 dark:text-gray-200 text-lg font-medium w-full text-center py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                    onClick={handleLinkClick}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
} 