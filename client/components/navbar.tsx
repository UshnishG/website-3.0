"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMobile, setIsMobile] = useState(false);

    // Check screen width for responsive layout
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Mobile if < 768px (MD breakpoint)
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
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

    return (
        <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-auto px-6 py-3 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg shadow-lg border border-transparent dark:border-white/20 rounded-full flex items-center justify-center space-x-6">
            {/* Mobile Menu Button (Only for small screens) */}
            {isMobile && (
                <button
                    className="text-gray-800 dark:text-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            )}

            {/* Navigation Links */}
            <div className={`flex ${isMobile ? "hidden" : "space-x-8"}`}>
                {navLinks.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group relative text-gray-800 dark:text-gray-200 font-medium transition hover:text-indigo-500"
                    >
                        {item.name}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </div>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                aria-label="Toggle Dark Mode"
            >
                {theme === "light" ? (
                    <Moon size={24} className="text-gray-800" />
                ) : (
                    <Sun size={24} className="text-yellow-400" />
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
                        className="fixed top-16 left-1/2 transform -translate-x-1/2 w-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg rounded-lg p-4 z-50"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-800 dark:text-gray-200 text-lg font-medium"
                                    onClick={() => setIsOpen(false)}
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
