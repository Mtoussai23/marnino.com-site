import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getLatestReleases } from "../lib/spotify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Music() {
  const [albums, setAlbums] = useState([]);
  const [showPlatforms, setShowPlatforms] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      const latest = await getLatestReleases();
      setAlbums(latest);
    };
    fetchAlbums();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-24 px-6">
        <h2 className="text-4xl font-serif font-bold mb-10 text-center">Latest Releases</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {albums.map((album) => (
            <a
              key={album.id}
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="w-56 rounded-2xl overflow-hidden border-2 border-[#CBB7B0] bg-white text-[#2A1A1F] hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={album.images[0].url}
                alt={album.name}
                width={224}
                height={224}
                className="w-full h-full object-cover"
              />
              <p className="mt-2 mb-4 text-center text-sm font-semibold">{album.name}</p>
            </a>
          ))}
        </div>

        {/* Floating Button */}
        <button
          onClick={() => setShowPlatforms(!showPlatforms)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#CBB7B0] border-2 border-[#2A1A1F] rounded-full flex items-center justify-center text-white text-lg shadow-lg hover:bg-[#b8a29b] transition-all duration-300 z-50"
        >
          ♪
        </button>

        {/* Streaming Platform Links */}
        <AnimatePresence>
          {showPlatforms && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-20 right-6 bg-white text-[#2A1A1F] border border-[#CBB7B0] p-4 rounded-xl space-y-2 shadow-lg z-50"
            >
              <a href="https://music.apple.com/us/artist/marnino-toussaint/1201363910" target="_blank" className="block hover:underline">Apple Music</a>
              <a href="https://amazon.com/music/player/artists/B01NAZKJL8/marnino-toussaint?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_stwB49qjvmu0FpigvOUrYn9b6" target="_blank" className="block hover:underline">Amazon Music</a>
              <a href="https://music.youtube.com/channel/UCdCukaD0YFrHNzHtGwrg3bg?si=WNmEzzEvxsCAurXZ" target="_blank" className="block hover:underline">YouTube Music</a>
              <a href="https://tidal.com/browse/artist/8488962" target="_blank" className="block hover:underline">TIDAL</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
