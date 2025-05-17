import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ setStoriesOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute top-0 w-full z-50 px-4 py-3 text-white text-xs md:text-sm flex justify-center md:justify-start space-x-4 md:space-x-8 transition-all duration-300 ${
        scrolled ? "backdrop-blur-sm" : ""
      }`}
    >
      <Link href="/" className="nav-link">Home</Link>
      <Link href="/music" className="nav-link">Music</Link>
      <Link href="/merch" className="nav-link">Merch</Link>
      <Link href="/events" className="nav-link">Events</Link>
      {isHomePage && (
        <button
          onClick={() => setStoriesOpen(true)}
          className="nav-link text-white"
        >
          Stories
        </button>
      )}
    </div>
  );
}
