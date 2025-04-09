"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  domain: string;
  coreMember: boolean;
  instagram: string;
  linkedin: string;
}

export default function Teams() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [domains, setDomains] = useState<string[]>([]);
  const [showCore, setShowCore] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch("/teamData.json");
        const data: TeamMember[] = await res.json();
        setTeamData(data);

        // Extract unique domains
        const uniqueDomains: string[] = Array.from(new Set(data.map((member) => member.domain)));
        setDomains(["all", ...uniqueDomains]);
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading team data:", err);
        setIsLoading(false);
      }
    };

    fetchTeamData();

    // Detect theme mode
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const filteredTeam = teamData.filter(
    (member) => selectedDomain === "all" || member.domain === selectedDomain
  );

  const coreMembers = teamData.filter((member) => member.coreMember);

  return (
    <section className="relative py-12 sm:py-16 md:py-20">
      {/* Minimal Title */}
      <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-12 md:mb-16 px-4">
        <h1 className="text-[36px] sm:text-[60px] md:text-[100px] lg:text-[120px] xl:text-[140px] font-extrabold tracking-tight text-gray-800 dark:text-gray-200 leading-none">
          OUR TEAM
        </h1>
        <h2 className="sr-only">Meet our Team</h2>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Toggle Between Core & Domain Members */}
        <div className="flex justify-center mb-6 space-x-3 sm:space-x-4">
          <Button
            onClick={() => setShowCore(true)}
            variant={showCore ? "default" : "outline"}
            className="transition-all px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
          >
            Core Members
          </Button>
          <Button
            onClick={() => setShowCore(false)}
            variant={!showCore ? "default" : "outline"}
            className="transition-all px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
          >
            By Domain
          </Button>
        </div>

        {/* Conditional Rendering Based on Selection */}
        {showCore ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                Loading team members...
              </div>
            ) : coreMembers.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No core members found.
              </div>
            ) : (
              coreMembers.map((member) => (
                <TeamCard key={member.name} member={member} isDarkMode={isDarkMode} />
              ))
            )}
          </div>
        ) : (
          <>
            {/* Domain Selection */}
            <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
              {domains.map((domain) => (
                <Button
                  key={domain}
                  variant={selectedDomain === domain ? "default" : "outline"}
                  onClick={() => setSelectedDomain(domain)}
                  className="text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-2 transition-all mb-2"
                  size="sm"
                >
                  {domain}
                </Button>
              ))}
            </div>

            {/* Team Members by Domain */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading team members...
                </div>
              ) : filteredTeam.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                  {selectedDomain === "all" ? "No team members found." : "No members in this domain."}
                </div>
              ) : (
                filteredTeam.map((member) => (
                  <TeamCard key={member.name} member={member} isDarkMode={isDarkMode} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Team Member Card Component
function TeamCard({ member, isDarkMode }: { member: TeamMember; isDarkMode: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl p-4 sm:p-6 shadow-md backdrop-blur-md transition-colors duration-500 h-full min-h-[100px] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center">
        <h3 className="text-base sm:text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{member.role}</p>
      </div>

      {/* Social Links */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="flex gap-4 mt-3">
          <a 
            href={member.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-pink-500 hover:scale-110 transition-transform"
            aria-label={`${member.name}'s Instagram`}
          >
            <FaInstagram size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a 
            href={member.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:scale-110 transition-transform"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </motion.div>
  );
} 