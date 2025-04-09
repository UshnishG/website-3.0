"use client";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Mobile Logo (Only visible on small screens) */}
        <div className="flex justify-center md:hidden mb-8">
          <div className="relative w-28 h-28">
            <Image
              src="/logoo.png"
              alt="Futurix Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section - Left (Full width on mobile) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Futurix</h3>
            <p className="text-sm text-gray-400 mt-2">Innovation | Technology | Future</p>
            <p className="text-sm text-gray-400 mt-4 max-w-md">
              Building the next generation of technology solutions for a better tomorrow.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 items-center mt-6">
              <a 
                href="https://www.instagram.com/futurix.ctech/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/futurix-srmist" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://github.com/futurix-org" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Logo - Center (Hidden on mobile, shown on desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <Image
                src="/logoo.png"
                alt="Futurix Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Contact Info - Right (Full width and centered on mobile) */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right border-t md:border-0 border-zinc-800 pt-8 md:pt-0 mt-4 md:mt-0">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 justify-center md:justify-end">
                <MdLocationOn className="text-indigo-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm max-w-[250px] md:text-right">SRM Institute of Science and Technology, Kattankulathur, Chennai</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-end">
                <MdEmail className="text-indigo-400 flex-shrink-0" size={18} />
                <a href="mailto:contact@futurix.tech" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm">
                  contact@futurix.tech
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-end">
                <MdPhone className="text-indigo-400 flex-shrink-0" size={18} />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-zinc-800 my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Futurix Association. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#privacy" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 