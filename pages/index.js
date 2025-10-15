import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });
import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MailchimpForm from "../components/MailchimpForm";

export default function Home() {
  // --- Layout/orientation state ---
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  // Desktop layout for real desktops AND phones in landscape
  const useDesktopLayout = !isSmallScreen || isLandscape;
  // Portrait-only “mobile” layout (your scrolling image with tap-to-reveal labels)
  const isMobilePortrait = !useDesktopLayout;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setIsSmallScreen(window.innerWidth < 768);
      const landscape =
        window.matchMedia?.("(orientation: landscape)")?.matches ||
        window.innerWidth > window.innerHeight;
      setIsLandscape(landscape);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const [currentRoom, setCurrentRoom] = useState(0);
  const [isMailchimpOpen, setMailchimpOpen] = useState(false);
  const [isFooterOpen, setFooterOpen] = useState(false);
  const [isStoriesOpen, setStoriesOpen] = useState(false);
  const [stories, setStories] = useState([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeDotId, setActiveDotId] = useState(null);

  const emojiReactions = ["🔥", "❤️", "😂", "👏", "😮"];
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesQuery = query(
          collection(db, "stories"),
          where("approved", "==", true)
        );
        const querySnapshot = await getDocs(storiesQuery);
        const storiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(storiesList);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close if the tap is NOT on a dot
      if (!e.target.closest(".dot-button")) {
        setActiveDotId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Auto-center the mobile scroll image (portrait only)
  useEffect(() => {
    if (!isMobilePortrait) return;
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        container.scrollTo({
          left: (container.scrollWidth - container.clientWidth) / 2,
          behavior: "smooth",
        });
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [currentRoom, isMobilePortrait]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    setUploading(true);

    const storageRef = ref(storage, `stories/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "stories"), {
          caption,
          mediaUrl: downloadURL,
          createdAt: serverTimestamp(),
          approved: false,
          reactions: {},
        });

        alert("Story uploaded for review!");
        setCaption("");
        setFile(null);
        setUploading(false);
      }
    );
  };

  const handleReaction = async (storyId, emoji) => {
    const storyRef = doc(db, "stories", storyId);
    const updatedStory = stories.find((s) => s.id === storyId);
    const currentCount = updatedStory.reactions?.[emoji] || 0;

    const newReactions = { ...updatedStory.reactions };
    if (currentCount > 0) {
      newReactions[emoji] = currentCount - 1;
      if (newReactions[emoji] === 0) delete newReactions[emoji];
    } else {
      newReactions[emoji] = 1;
    }

    await updateDoc(storyRef, { reactions: newReactions });
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, reactions: newReactions } : s))
    );
  };

  const rooms = [
    { src: "/homepage.jpg", label: "Main Room" },
    { src: "/music.jpg", label: "Music Room" },
    { src: "/purpleflux.jpg", label: "Purple Flux" },
  ];

  const changeRoom = (direction) => {
    setCurrentRoom((prev) => {
      let next = prev + direction;
      if (next < 0) next = rooms.length - 1;
      if (next >= rooms.length) next = 0;
      return next;
    });
  };

  // --- Dots, but layout-aware: portrait mobile vs desktop/landscape ---
  const getHoverDots = () => {
    const currentLabel = rooms[currentRoom].label;
    const M = isMobilePortrait; // alias for readability

    if (currentLabel === "Main Room") {
      return [
        {
          id: "poetry",
          label: "Poetry",
          top: M ? "88%" : "96%",
          left: M ? "82%" : "48%",
          link: "/poetry",
        },
        {
          id: "portfolio",
          label: "Portfolio",
          top: M ? "83%" : "90%",
          left: M ? "82%" : "48%",
          link: "/portfolio",
        },
        {
          id: "single",
          label: "Latest Releases",
          top: "52%",
          left: M ? "84%" : "49%",
          link: "/music",
        },
      ];
    }

    if (currentLabel === "Music Room") {
      return [
        {
          id: "purpleflux",
          label: "Purple Flux",
          top: "78%",
          left: M ? "93%" : "55%",
          link: "https://purpleflux.bandzoogle.com/purple-flux-epk",
        },
        {
          id: "firsthouse",
          label: "First House",
          top: "54%",
          left: M ? "60%" : "35%",
          link: "https://www.firsthouse.media/",
        },
      ];
    }

    if (currentLabel === "Purple Flux") {
      return [
        {
          id: "playlists",
          label: "Playlists",
          top: "50%",
          left: M ? "109%" : "65%",
          link: "https://open.spotify.com/playlist/1IQ7GSQALjqV1fq39FImuF?si=bc4YuJZYT22oHRVNR_yRDg&pt=0c13a9083d514e74c837ab8aa24b7e01&pi=Musqii2WSyyN9",
        },
        {
          id: "comingsoon",
          label: "Coming Soon",
          top: "45%",
          left: M ? "40%" : "25%",
          link: "#",
        },
      ];
    }

    return [];
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <Header setStoriesOpen={setStoriesOpen} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoom}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 w-full h-full z-0" // must stay z-0
        >
          <div className="w-full h-full overflow-hidden">
            <div className="relative w-full h-full">
              {/* Desktop & Landscape (phones) */}
              {useDesktopLayout && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={rooms[currentRoom].src}
                    alt={rooms[currentRoom].label}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Hover Dots (Desktop behavior) */}
                  {getHoverDots().map((dot) => (
                    <div
                      key={dot.id}
                      className="absolute dot-button group"
                      style={{ top: dot.top, left: dot.left }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          dot.link,
                          dot.link.startsWith("http") ? "_blank" : "_self"
                        );
                      }}
                    >
                      <div className="relative w-2.5 h-2.5 rounded-full bg-white opacity-70 transition-all duration-300 shadow-md">
                        <div className="dot-ring" />
                      </div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-black text-xs px-2 py-1 rounded-md font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                        {dot.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Portrait (scroll image + tap-to-reveal) */}
              {!useDesktopLayout && (
                <div
                  ref={scrollRef}
                  className="block w-full h-full overflow-x-auto overflow-y-hidden z-0"
                >
                  <div className="relative w-[200vw] h-full flex items-center">
                    <img
                      src={rooms[currentRoom].src}
                      alt={rooms[currentRoom].label}
                      className="h-full w-auto max-w-none object-contain"
                    />

                    {/* Mobile dots that move with the image (two-tap behavior) */}
                    {getHoverDots().map((dot) => {
                      const isActive = activeDotId === dot.id;
                      return (
                        <div
                          key={dot.id}
                          className="absolute dot-button group"
                          style={{ top: dot.top, left: dot.left }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isActive) {
                              window.open(
                                dot.link,
                                dot.link.startsWith("http") ? "_blank" : "_self"
                              );
                            } else {
                              setActiveDotId(dot.id);
                            }
                          }}
                        >
                          <div className="relative w-2.5 h-2.5 rounded-full bg-white opacity-70 transition-all duration-300 shadow-md">
                            <div className="dot-ring" />
                          </div>
                          <div
                            className={`${poppins.className} absolute left-6 top-1/2 -translate-y-1/2 bg-white text-black text-xs px-2 py-1 rounded-md transition duration-300 font-bold ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={() =>
                              window.open(
                                dot.link,
                                dot.link.startsWith("http") ? "_blank" : "_self"
                              )
                            }
                          >
                            {dot.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {(isFooterOpen || isStoriesOpen) && (
        <div className="absolute inset-0 z-20 backdrop-blur-2xl bg-black/30 transition duration-300 pointer-events-none" />
      )}

      {!(isFooterOpen || isStoriesOpen) && (
        <>
          <motion.button className="mobile-arrow left-3" onClick={() => changeRoom(-1)}>
            Prev
          </motion.button>
          <motion.button className="mobile-arrow right-3" onClick={() => changeRoom(1)}>
            Next
          </motion.button>
        </>
      )}

      {isHomePage && (
        <>
          <button
            onClick={() => setFooterOpen(!isFooterOpen)}
            className="absolute bottom-5 right-5 w-8 h-8 border border-white rounded-full flex items-center justify-center text-white z-50"
          >
            M
          </button>

          <AnimatePresence>
            {isFooterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-16 right-5 text-white text-xs md:text-sm flex flex-col items-end space-y-2 z-50"
              >
                <a
                  href="https://www.instagram.com/marnino_"
                  className="footer-link"
                  target="_blank"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@marninot"
                  className="footer-link"
                  target="_blank"
                >
                  TikTok
                </a>
                <a
                  href="https://www.facebook.com/MarninoT/"
                  className="footer-link"
                  target="_blank"
                >
                  Facebook
                </a>
                <button onClick={() => setMailchimpOpen(true)} className="footer-link">
                  Subscribe
                </button>
                <Link href="/policies/faq" className="footer-link">
                  FAQ
                </Link>
                <Link href="/policies/terms-of-service" className="footer-link">
                  Terms
                </Link>
                <Link href="/policies/privacy-policy" className="footer-link">
                  Privacy
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isStoriesOpen && (
              <motion.div className="absolute top-16 left-1/2 transform -translate-x-1/2 border-2 border-white rounded-lg p-6 text-white w-80 shadow-lg z-50 backdrop-blur-xl bg-opacity-30">
                <button
                  onClick={() => setStoriesOpen(false)}
                  className="absolute top-2 right-2 text-white text-xl font-bold hover:text-gray-300"
                >
                  ✖
                </button>
                <h2 className="text-lg font-bold mb-2">Latest Stories</h2>
                <ul className="max-h-64 overflow-y-auto">
                  {stories.length > 0 ? (
                    stories.map((story) => (
                      <li key={story.id} className="mb-4 pb-4">
                        <p className="text-sm">{story.caption}</p>
                        {story.mediaUrl && (
                          <img
                            src={story.mediaUrl}
                            alt="Story"
                            className="w-full h-auto object-cover rounded-lg shadow-md mt-2"
                          />
                        )}
                        <div className="flex space-x-2 mt-2">
                          {emojiReactions.map((emoji) => (
                            <motion.button
                              key={emoji}
                              onClick={() => handleReaction(story.id, emoji)}
                              className="text-xl"
                              whileTap={{ scale: 1.5 }}
                            >
                              {emoji} {story.reactions?.[emoji] || 0}
                            </motion.button>
                          ))}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-300">No new stories yet.</p>
                  )}
                </ul>
                <div className="mt-4">
                  <form onSubmit={handleFileUpload} className="flex flex-col items-center space-y-2">
                    <input
                      type="text"
                      placeholder="Enter caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="text-black p-2 w-full rounded border border-gray-400"
                      required
                    />
                    <label className="bg-white text-black font-semibold px-4 py-2 rounded shadow cursor-pointer hover:bg-gray-200 transition duration-300 w-full text-center">
                      Choose File
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </label>

                    {file && (
                      <p className="text-xs text-white mt-2 truncate">Selected: {file.name}</p>
                    )}

                    <button
                      type="submit"
                      className="bg-white text-black px-4 py-2 rounded font-bold shadow-md hover:bg-gray-300"
                    >
                      {uploading ? "Uploading..." : "Upload Story"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <MailchimpForm isOpen={isMailchimpOpen} onClose={() => setMailchimpOpen(false)} />
        </>
      )}

      <style jsx global>{`
        .mobile-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: transparent;
          border: 1px solid white;
          color: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          border-radius: 9999px;
          display: block;
          transition: all 0.3s ease;
        }
        .mobile-arrow.left-3 {
          left: 0.75rem;
        }
        .mobile-arrow.right-3 {
          right: 0.75rem;
        }
        .mobile-arrow:hover {
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          background-color: rgba(255, 255, 255, 0.1);
        }
        .mobile-arrow:active {
          transform: translateY(-50%) scale(0.95);
          box-shadow: 0 0 18px rgba(255, 255, 255, 1);
        }
      `}</style>
    </div>
  );
}
