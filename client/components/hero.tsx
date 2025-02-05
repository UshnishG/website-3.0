"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }

    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (isDarkMode) {
        gradient.addColorStop(0, "#4a00e0")
        gradient.addColorStop(1, "#7008cc")
      } else {
        gradient.addColorStop(0, "#cab6cc")
        gradient.addColorStop(1, "#7e319c")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [isDarkMode])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Futurix Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={isDarkMode ? "/logo-dark.png" : "/logo.png"}
            alt="Futurix Logo"
            width={isDarkMode ? 450 : 400}
            height={isDarkMode ? 120 : 100}
            layout="intrinsic"
            priority
          />
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          className={`mt-4 text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          OFFICIAL C.TECH STUDENT ASSOCIATION
        </motion.h2>

        {/* Social Icons */}
        <motion.div
          className="mt-6 flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Instagram Icon */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform duration-300">
            <FaInstagram size={40} />
          </a>

          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/company/futurix-srmist" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition-transform duration-300">
            <FaLinkedin size={40} />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
