"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the LandingPage component to avoid SSR issues with Three.js
const LandingPage = dynamic(() => import("./_components/LandingPage"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#08091a] via-[#0a0d26] to-[#080d1f]">
      <div className="animate-pulse text-2xl font-bold text-blue-300">
        Loading EarthSim...
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPage />
    </Suspense>
  );
}
