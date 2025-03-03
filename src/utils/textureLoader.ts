// File: src/utils/textureLoader.ts
import * as THREE from "three";

// This function can be used to preload textures
export const preloadEarthTextures = () => {
  const textureLoader = new THREE.TextureLoader();
  const textureURLs = [
    "/textures/earth_daymap.jpg",
    "/textures/earth_normal_map.jpg",
    "/textures/earth_specular_map.jpg",
    "/textures/earth_clouds.jpg",
    "/textures/earth_nightmap.jpg",
    "/textures/earth_bump_map.jpg",
  ];

  return Promise.all(
    textureURLs.map(
      (url) =>
        new Promise((resolve) => {
          textureLoader.load(url, (texture) => {
            resolve(texture);
          });
        }),
    ),
  );
};

// Add these instructions to your README or a setup file:
/*
TEXTURE SETUP INSTRUCTIONS:

For the hyper-realistic Earth, you'll need high-quality texture maps. 
Download these files and place them in the public/textures directory:

1. earth_daymap.jpg - High resolution color map of Earth (8k or higher recommended)
2. earth_normal_map.jpg - Normal map for terrain elevation
3. earth_specular_map.jpg - Specular map for shininess
4. earth_clouds.jpg - Cloud layer map
5. earth_nightmap.jpg - Night lights map
6. earth_bump_map.jpg - Bump map for additional terrain details
7. earth_water_map.jpg - Water mask for oceans

You can find these textures from:
- NASA Visible Earth (https://visibleearth.nasa.gov/)
- Solar System Scope (https://www.solarsystemscope.com/textures/)
- Shadedrelief (https://www.shadedrelief.com/natural3/pages/textures.html)

For best results, use 8k textures (8192×4096 pixels) to ensure high detail.
*/
