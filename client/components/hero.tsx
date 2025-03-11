"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bpurplebg.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        {/* Logo & Title Together */}
        <motion.div
  className="flex flex-col items-center gap-2 pt-6 sm:pt-0"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <Image
    src="/logoo.png"
    alt="Futurix Logo"
    width={500}
    height={500}
    priority
  />
  <h2 className="text-3xl font-bold tracking-wide sm:text-4xl lg:text-5xl text-white">
    OFFICIAL C.TECH STUDENT ASSOCIATION
  </h2>
</motion.div>


        {/* Social Icons */}
        <motion.div
          className="mt-6 flex space-x-10"
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
            <FaInstagram size={40} />
          </a>
          <a
            href="https://www.linkedin.com/company/futurix-srmist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedin size={40} />
          </a>
        </motion.div>

        {/* About Us Card */}
        <motion.div
          className="mt-16 p-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl shadow-purple-500 max-w-2xl transition-transform duration-500 hover:scale-105 hover:shadow-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h3 className="text-4xl font-bold text-white">About Us</h3>
          <p className="mt-6 text-white text-lg sm:text-xl leading-relaxed">
            Futurix is the official student association of C.Tech, dedicated to fostering innovation, collaboration, and excellence in technology. We empower students through hands-on projects, hackathons, and networking opportunities with industry leaders. Our mission is to create a vibrant tech-driven community that shapes the future.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
