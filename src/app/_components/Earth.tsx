"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";

interface Satellite {
  radius: number;
  speed: number;
  inclination: number;
  phase: number;
}

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const nightRef = useRef<THREE.Mesh>(null);
  const satelliteGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const orbitLineRefs = useRef<(THREE.Line | null)[]>([]);

  // Function to create fallback texture
  const createFallbackTexture = (textureUrl: string): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = textureUrl.includes("clouds")
        ? "rgba(255,255,255,0.5)"
        : "#1E4D8A";
      context.fillRect(0, 0, 2, 2);
    }
    return new THREE.CanvasTexture(canvas);
  };

  // Load high-resolution textures for hyper-realistic Earth
  const [
    colorMap,
    normalMap,
    specularMap,
    cloudsMap,
    nightMap,
    bumpMap,
    waterMap,
  ] = useLoader(
    THREE.TextureLoader,
    [
      "/textures/earth_daymap.jpg",
      "/textures/earth_specular_map.jpg",
      "/textures/earth_clouds.jpg",
      "/textures/earth_nightmap.jpg",
      "/textures/earth_bump_map.jpg",
    ],
    (loader) => {
      // Setup error handling for texture loading
      loader.crossOrigin = "";
    },
    (error) => {
      // Handle texture loading errors
      const errorUrl =
        typeof error === "object" &&
        error !== null &&
        "target" in error &&
        typeof error.target === "object" &&
        error.target !== null &&
        "src" in error.target
          ? String(error.target.src)
          : "unknown texture";

      console.warn("Texture loading error:", errorUrl);
      return createFallbackTexture(errorUrl);
    },
  );

  // Generate satellite positions with the same logic from the vanilla version
  const generateSatellites = (count: number): Satellite[] => {
    return Array.from({ length: count }, () => ({
      radius: 2 + Math.random() * 0.3,
      speed: 0.001 + Math.random() * 0.002,
      inclination: Math.random() * Math.PI,
      phase: Math.random() * Math.PI * 2,
    }));
  };

  const satellites = generateSatellites(12);

  // Setup orbits for satellites
  const createOrbitPoints = (
    radius: number,
    inclination: number,
  ): THREE.Vector3[] => {
    const points = [];
    for (let j = 0; j <= 64; j++) {
      const angle = (j / 64) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle) * Math.cos(inclination);
      const y = radius * Math.sin(angle) * Math.sin(inclination);
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  };

  // Animation loop - preserving original rotation speeds and logic
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Rotate Earth
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.05;
    }

    if (waterRef.current) {
      waterRef.current.rotation.y = time * 0.05;
    }

    // Rotate clouds slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.055;
    }

    // Update night lights position opposite to the sun
    if (nightRef.current) {
      nightRef.current.rotation.y = Math.PI + time * 0.05;
    }

    // Update satellites
    satelliteGroupRefs.current.forEach((satellite, index) => {
      if (satellite && index < satellites.length) {
        const sat = satellites[index];
        if (!sat) return;

        const satelliteTime = time * sat.speed + sat.phase;
        satellite.position.x = sat.radius * Math.cos(satelliteTime);
        satellite.position.z =
          sat.radius * Math.sin(satelliteTime) * Math.cos(sat.inclination);
        satellite.position.y =
          sat.radius * Math.sin(satelliteTime) * Math.sin(sat.inclination);

        // Satellite faces direction of travel
        satellite.lookAt(0, 0, 0);
      }
    });
  });

  useEffect(() => {
    // Initialize refs arrays
    satelliteGroupRefs.current = Array(satellites.length).fill(null);
    orbitLineRefs.current = Array(satellites.length).fill(null);

    // Initial animation when component mounts - preserving the GSAP animation
    if (earthRef.current) {
      gsap.from(earthRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <>
      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} />

      {/* Main Earth mesh */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
        />
      </mesh>

      {/* Water layer */}
      <mesh ref={waterRef}>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshPhongMaterial map={waterMap} transparent={true} opacity={0.25} />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshStandardMaterial
          color="#88ccff"
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Night lights */}
      <mesh ref={nightRef} rotation={[0, Math.PI, 0]}>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial
          map={nightMap}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Satellites and orbits */}
      {satellites.map((config, index) => (
        <group key={`satellite-${index}`}>
          {/* Orbit path */}
          <primitive
            object={
              new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(
                  createOrbitPoints(config.radius, config.inclination),
                ),
                new THREE.LineBasicMaterial({
                  color: "#ffffff",
                  opacity: 0.2,
                  transparent: true,
                }),
              )
            }
            ref={(
              el: THREE.Line<
                THREE.BufferGeometry<THREE.NormalBufferAttributes>,
                THREE.Material | THREE.Material[],
                THREE.Object3DEventMap
              >,
            ) => {
              if (el) orbitLineRefs.current[index] = el as THREE.Line;
            }}
          />

          {/* Satellite with solar panels */}
          <group
            ref={(el: THREE.Group | null) => {
              if (el) satelliteGroupRefs.current[index] = el;
            }}
            position={[config.radius, 0, 0]}
          >
            {/* Satellite body */}
            <mesh>
              <boxGeometry args={[0.1, 0.02, 0.04]} />
              <meshStandardMaterial
                color="#aaaaff"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Solar panels */}
            <mesh position={[0, 0, 0.08]}>
              <boxGeometry args={[0.15, 0.01, 0.1]} />
              <meshStandardMaterial
                color="#4444ff"
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>

            <mesh position={[0, 0, -0.08]}>
              <boxGeometry args={[0.15, 0.01, 0.1]} />
              <meshStandardMaterial
                color="#4444ff"
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* Light sources */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
    </>
  );
};

export default Earth;
