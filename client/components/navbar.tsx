"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Toggle Theme Mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-lg z-50"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Centered Navigation Links */}
        <div className="flex-grow flex justify-center">
          <div className="hidden md:flex space-x-10">
            {["Home", "Gallery", "Portfolio", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-white text-lg font-semibold hover:text-gray-300 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-white p-2 rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle Dark Mode"
        >
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col items-center space-y-6 py-6">
            {["Home", "Gallery", "Portfolio", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-white text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
