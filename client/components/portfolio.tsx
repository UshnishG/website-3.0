"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define the type for a team member
interface TeamMember {
  name: string
  domain: string
  coreMember: boolean
  instagram: string
  linkedin: string
}

export default function Teams() {
  const [teamData, setTeamData] = useState<TeamMember[]>([])
  const [selectedDomain, setSelectedDomain] = useState<string>("all")
  const [domains, setDomains] = useState<string[]>([])

  useEffect(() => {
    const fetchTeamData = async () => {
      const res = await fetch("/teamData.json") // Path to the JSON file
      const data: TeamMember[] = await res.json() // Type assertion
      setTeamData(data)

      // Extract unique domains
      const uniqueDomains: string[] = Array.from(new Set(data.map((member) => member.domain)))
      setDomains(["all", ...uniqueDomains])
    }

    fetchTeamData()
  }, [])

  const filteredTeam = teamData.filter(
    (member) => selectedDomain === "all" || member.domain === selectedDomain
  )

  const coreMembers = teamData.filter((member) => member.coreMember)

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        {/* Core Members Section */}
        <div className="mb-12">
          <h2 className="text-3xl text-center font-semibold text-white mb-8">Core Members</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {coreMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden bg-zinc-900">
                <CardContent className="p-0">
                  <div className="group relative flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-xl font-semibold text-white">{member.name}</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex gap-4 mt-4">
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                          <img
                            src="/instagram-icon.svg"
                            alt="Instagram"
                            className="h-6 w-6 hover:text-pink-500 transition-colors duration-300"
                          />
                        </a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <img
                            src="/linkedin-icon.svg"
                            alt="LinkedIn"
                            className="h-6 w-6 hover:text-blue-500 transition-colors duration-300"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Domain Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {domains.map((domain) => (
            <Button
              key={domain}
              variant={selectedDomain === domain ? "default" : "outline"}
              onClick={() => setSelectedDomain(domain)}
              className="text-sm capitalize"
            >
              {domain}
            </Button>
          ))}
        </div>

        {/* Render the team members for the selected domain */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTeam.map((member) => (
            <Card key={member.name} className="overflow-hidden bg-zinc-900">
              <CardContent className="p-0">
                <div className="group relative flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-xl font-semibold text-white">{member.name}</div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex gap-4 mt-4">
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                        <img
                          src="/instagram-icon.svg"
                          alt="Instagram"
                          className="h-6 w-6 hover:text-pink-500 transition-colors duration-300"
                        />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <img
                          src="/linkedin-icon.svg"
                          alt="LinkedIn"
                          className="h-6 w-6 hover:text-blue-500 transition-colors duration-300"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
