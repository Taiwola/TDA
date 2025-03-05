"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false); // Track switching state

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$49.99",
      image: "/images/catalogue1.jpeg",
      link: "/product/1",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$59.99",
      image: "/images/carousel2.jpg",
      link: "/product/2",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$69.99",
      image: "/images/carousel3.jpg",
      link: "/product/3",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$69.99",
      image: "/images/carousel4.jpg",
      link: "/product/3",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$69.99",
      image: "/images/carousel1.png",
      link: "/product/3",
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwitching(true); // Start switching
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % products.length);
      }, 1000); // Delay the slide change to allow the overlay to appear
    }, 6000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [products.length]);

  // Reset isSwitching after the slide transition is complete
  useEffect(() => {
    if (isSwitching) {
      const timer = setTimeout(() => {
        setIsSwitching(false);
      }, 1000); // Match the duration of the slide transition
      return () => clearTimeout(timer);
    }
  }, [isSwitching]);

  return (
    <>
      <div className="relative w-full bg-slate-200 h-[200vh] overflow-hidden">
        {/* Dark Overlay */}
        <AnimatePresence>
          {isSwitching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }} // Dark overlay opacity
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/5 z-10" // Full-screen overlay
            />
          )}
        </AnimatePresence>

        {/* Slide Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={products[index].id}
            className="w-full h-full relative"
            initial={{ height: 0 }} // Start with 0 height
            animate={{ height: "200vh" }} // Animate to full height
            exit={{ height: 0 }} // Exit animation
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
            onAnimationStart={() => setIsSwitching(true)} // Start overlay when animation starts
            onAnimationComplete={() => setIsSwitching(false)} // End overlay when animation completes
          >
            <Image
              src={products[index].image}
              alt={`${products[index].name}`}
              fill
              className="object-cover" // Ensures the image covers the container
              quality={100} // Set image quality (1-100)
              priority // Preload the image for better performance
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsSwitching(true); // Start switching
                setIndex(i); // Change slide
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/products">
          <Button className="mt-7 mb-7 px-6 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
            Shop More
          </Button>
        </Link>
      </div>
    </>
  );
}
