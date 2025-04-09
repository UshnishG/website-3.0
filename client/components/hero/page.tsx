"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import CircuitBoardAnimation from "./CircuitBoardAnimation";
import { useTheme } from "../ThemeProvider/page";

export default function Hero() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Circuit Board Animation Background */}
      <CircuitBoardAnimation />

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-8 text-center">
        {/* Logo & Title Together */}
        <motion.div
          className="flex flex-col items-center gap-2 pt-6 sm:pt-0 max-w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/logoo.png"
            alt="Futurix Logo"
            width={500}
            height={500}
            className="w-[250px] h-auto sm:w-[350px] md:w-[400px] lg:w-[500px]"
            priority
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-white mt-2 sm:mt-4">
            OFFICIAL C.TECH STUDENT ASSOCIATION
          </h2>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="mt-4 sm:mt-6 flex space-x-6 sm:space-x-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="https://www.instagram.com/futurix.ctech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:scale-110 transition-transform duration-300"
          >
            <FaInstagram size={30} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </a>
          <a
            href="https://www.linkedin.com/company/futurix-srmist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedin size={30} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </a>
        </motion.div>

        {/* About Us Card */}
        <motion.div
          className={`mt-8 sm:mt-12 md:mt-16 p-5 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl max-w-[95%] sm:max-w-xl md:max-w-2xl transition-all duration-500 hover:scale-105 ${
            isDarkMode 
              ? "bg-gray-900 bg-opacity-70 backdrop-blur-lg shadow-xl shadow-purple-800 hover:shadow-purple-700 text-white" 
              : "bg-white bg-opacity-10 backdrop-blur-lg shadow-xl shadow-purple-500 hover:shadow-purple-400 text-white"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${isDarkMode ? "text-purple-300" : "text-white"}`}>About Us</h3>
          <p className={`mt-2 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed ${isDarkMode ? "text-gray-300" : "text-white"}`}>
            Futurix is the official student association of C.Tech, dedicated to fostering innovation, collaboration, and excellence in technology. We empower students through hands-on projects, hackathons, and networking opportunities with industry leaders. Our mission is to create a vibrant tech-driven community that shapes the future.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 