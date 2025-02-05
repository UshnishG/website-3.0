"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const images = [
    { src: "/Poster1.jpg", alt: "Art piece 1", title: "Ethereal Dreams" },
    { src: "/hack.jpg", alt: "Art piece 2", title: "Urban Symphony" },
    { src: "/hack.jpg", alt: "Art piece 3", title: "Digital Nostalgia" },
    { src: "/Poster1.jpg", alt: "Art piece 4", title: "Abstract Reality" },
  ]

  return (
    <section className="relative py-10 sm:py-20">
      <div ref={ref} className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          className="mb-8 text-center text-2xl font-bold tracking-tighter sm:text-4xl transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          PAST EVENTS
        </motion.h2>

        {/* Grid Layout */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                {/* Image with Hover Animation */}
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Title Text */}
                <h3 className="text-lg sm:text-xl font-semibold text-white">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
