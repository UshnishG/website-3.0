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

  useEffect(() => {
    const fetchTeamData = async () => {
      const res = await fetch("/teamData.json");
      const data: TeamMember[] = await res.json();
      setTeamData(data);

      // Extract unique domains
      const uniqueDomains: string[] = Array.from(new Set(data.map((member) => member.domain)));
      setDomains(["all", ...uniqueDomains]);
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
    <section className="relative py-20">
      {/* Minimal Title */}
      <div className="relative flex flex-col items-center justify-center mb-16">
        <h1 className="text-[50px] sm:text-[100px] md:text-[120px] xl:text-[140px] font-extrabold tracking-tight text-gray-800 dark:text-gray-200">
          OUR TEAM
        </h1>
        <h2 className="absolute text-[20px] sm:text-[36px] md:text-[50px] xl:text-[70px] font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
          Meet our Team
        </h2>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Toggle Between Core & Domain Members */}
        <div className="flex justify-center mb-6 space-x-4">
          <Button
            onClick={() => setShowCore(true)}
            variant={showCore ? "default" : "outline"}
            className="transition-all px-6 py-2 text-sm"
          >
            Core Members
          </Button>
          <Button
            onClick={() => setShowCore(false)}
            variant={!showCore ? "default" : "outline"}
            className="transition-all px-6 py-2 text-sm"
          >
            By Domain
          </Button>
        </div>

        {/* Conditional Rendering Based on Selection */}
        {showCore ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {coreMembers.map((member) => (
              <TeamCard key={member.name} member={member} isDarkMode={isDarkMode} />
            ))}
          </div>
        ) : (
          <>
            {/* Domain Selection */}
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              {domains.map((domain) => (
                <Button
                  key={domain}
                  variant={selectedDomain === domain ? "default" : "outline"}
                  onClick={() => setSelectedDomain(domain)}
                  className="text-sm px-5 py-2 transition-all"
                >
                  {domain}
                </Button>
              ))}
            </div>

            {/* Team Members by Domain */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredTeam.map((member) => (
                <TeamCard key={member.name} member={member} isDarkMode={isDarkMode} />
              ))}
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
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl p-6 shadow-md backdrop-blur-md transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-gray-500">{member.role}</p>
      </div>

      {/* Social Links */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="flex gap-4 mt-3">
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform">
            <FaInstagram size={24} />
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition-transform">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
