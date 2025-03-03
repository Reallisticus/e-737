"use client";
import { useEffect } from "react";
// import EarthScene from "./EarthScene";
// import LoginForm from "./LoginForm";
import { motion } from "framer-motion";
import gsap from "gsap";
import LoginForm from "./LoginForm";
import EarthScene from "./EarthScene";

const LandingPage = () => {
  // useEffect(() => {
  //   // Background stars animation
  //   const starsContainer = document.querySelector(".stars-container");
  //   if (starsContainer) {
  //     const stars = Array.from({ length: 200 }).map(() => {
  //       const star = document.createElement("div");
  //       star.className = "absolute rounded-full bg-white";

  //       // Random size
  //       const size = Math.random() * 2 + 1;
  //       star.style.width = `${size}px`;
  //       star.style.height = `${size}px`;

  //       // Random position
  //       star.style.left = `${Math.random() * 100}%`;
  //       star.style.top = `${Math.random() * 100}%`;

  //       // Random opacity
  //       star.style.opacity = `${Math.random() * 0.7 + 0.3}`;

  //       return star;
  //     });

  //     stars.forEach((star) => {
  //       starsContainer.appendChild(star);

  //       // Twinkling animation
  //       gsap.to(star, {
  //         opacity: Math.random() * 0.5 + 0.1,
  //         duration: Math.random() * 3 + 1,
  //         repeat: -1,
  //         yoyo: true,
  //       });
  //     });
  //   }

  //   return () => {
  //     // Cleanup
  //     const starsContainer = document.querySelector(".stars-container");
  //     if (starsContainer) {
  //       starsContainer.innerHTML = "";
  //     }
  //   };
  // }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#08091a] via-[#0a0d26] to-[#080d1f]" />

      {/* Stars background */}
      <div className="stars-container absolute inset-0 z-10" />

      {/* Animated nebula/galaxy elements */}
      <motion.div
        className="absolute z-10 h-[800px] w-[800px] rounded-full bg-blue-900 opacity-5 blur-3xl"
        style={{ top: "20%", left: "30%" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute z-10 h-[400px] w-[400px] rounded-full bg-purple-900 opacity-5 blur-3xl"
        style={{ top: "60%", left: "70%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Earth Scene (left side) */}
      <EarthScene />

      {/* Login Form (right side) */}
      <LoginForm />
    </div>
  );
};

export default LandingPage;
