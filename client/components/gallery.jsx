"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards"; // Updated import path

export default function Gallery() {
  const images = [
    "/Events/2.jpeg",
    "/Events/3.jpeg",
    "/Events/4.jpeg",
    "/Events/5.jpeg",
    "/Events/6.jpeg",
    "/Events/7.jpeg",
    "/Events/8.jpg",
    "/Events/9.jpg",
    "/Events/10.jpg",
    "/Events/11.jpg",
    "/Events/14.jpeg",
    "/Events/21.jpg",
    "/Events/22.jpg",
    "/Events/23.jpg",
    "/Events/24.jpeg",
    "/Events/25.jpg",
  ];
  
      

  // Split images into two rows
  const firstRowImages = images.slice(0, Math.ceil(images.length/2));
  const secondRowImages = images.slice(0, Math.ceil(images.length/2));

  return (
    <>
      <div className="relative flex flex-col items-center justify-center mb-16">
                <h1 className="text-[50px] sm:text-[100px] md:text-[120px] xl:text-[140px] font-extrabold tracking-tight text-gray-800 dark:text-gray-200">
                    GLIMPSE
                </h1>
                <h2 className="absolute text-[24px] sm:text-[40px] md:text-[60px] xl:text-[80px] font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
                    Glimpse
                </h2>
            </div>
      <div className="space-y-10">
        {/* First Row */}
        <div className="h-[25rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={firstRowImages} direction="right" speed="normal" />
        </div>

        {/* Second Row */}
        <div className="h-[25rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={secondRowImages} direction="left" speed="normal" />
        </div>
      </div>
    </>
  );
}
