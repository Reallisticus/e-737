"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";
import { motion } from "framer-motion";

const EarthScene = () => {
  return (
    <motion.div
      className="absolute left-0 top-0 h-screen w-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]} // Handle high-DPI displays
      >
        <Suspense fallback={null}>
          <Earth />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};

export default EarthScene;
