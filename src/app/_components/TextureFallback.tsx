"use client";

import { useState, useEffect } from "react";
import { checkTexturesLoaded } from "../../utils/textureSetup";

interface TextureFallbackProps {
  children: React.ReactNode;
}

const TextureFallback = ({ children }: TextureFallbackProps) => {
  const [missingTextures, setMissingTextures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTextures = async () => {
      const { allTexturesLoaded, textureStatus } = await checkTexturesLoaded();

      if (!allTexturesLoaded) {
        const missing = textureStatus
          .filter((status) => !status.exists)
          .map((status) => status.url);
        setMissingTextures(missing);
      }

      setLoading(false);
    };

    checkTextures();
  }, []);

  if (loading) {
    return (
      <div className="bg-space-dark fixed inset-0 z-50 flex items-center justify-center">
        <div className="text-2xl text-blue-300">Checking Earth textures...</div>
      </div>
    );
  }

  if (missingTextures.length > 0) {
    return (
      <div className="bg-space-dark fixed inset-0 z-50 flex flex-col items-center justify-center p-8">
        <div className="mb-4 text-2xl text-red-400">Missing Earth Textures</div>
        <div className="mb-6 text-white">
          The following texture files are missing and need to be added to your
          project:
        </div>
        <div className="w-full max-w-2xl rounded bg-gray-900 p-4">
          <ul className="list-disc pl-5 text-blue-300">
            {missingTextures.map((texture) => (
              <li key={texture} className="mb-2">
                {texture}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-sm text-gray-300">
          Note: The Earth will render with fallback textures, but for best
          results, please add the missing files to your public/textures
          directory.
        </div>
        <button
          className="mt-6 rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          onClick={() => setMissingTextures([])}
        >
          Continue Anyway
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default TextureFallback;
