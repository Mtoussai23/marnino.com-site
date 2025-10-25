// pages/presave.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HYPERFOLLOW_URL = "https://distrokid.com/hyperfollow/marninotoussaint/nostalgia";

export default function PresavePage() {
  const [iframeAllowed, setIframeAllowed] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    // If onLoad never fires, assume blocked after 1.5s
    const t = setTimeout(() => {
      if (!loaded.current) setIframeAllowed(false);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    // Optional: fire your analytics
    if (typeof window !== "undefined") {
      try {
        // Meta Pixel custom event if you use it globally
        if (window.fbq) window.fbq("trackCustom", "PreSaveClick");
        // GA4 example
        if (window.gtag) window.gtag("event", "pre_save_click", { page_location: window.location.href });
        // Beacon to your server for a simple count
        if (navigator.sendBeacon) {
          const data = new Blob([JSON.stringify({ ts: Date.now() })], { type: "application/json" });
          navigator.sendBeacon("/api/presave-click", data);
        }
      } catch {}
    }
  };

  return (
    <>
      <Head>
        <title>Pre-Save “Nostalgia” — Marnino</title>
        <meta name="description" content="Pre-save Marnino’s new single 'Nostalgia' so you get it first when it drops!" />
      </Head>

      <main className="min-h-screen bg-[#EAE5DF] flex items-center justify-center p-6 text-[#1C1C1C]">
        <div className="w-full max-w-3xl bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold">Pre-Save “Nostalgia”</h1>
            <p className="opacity-80 mt-2">Lock it in so it shows up in your library on release day.</p>
          </div>

          {/* Primary CTA (always visible for reliability + tracking) */}
          <div className="text-center mb-6">
            <Link
              href={HYPERFOLLOW_URL}
              target="_blank"
              onClick={handleClick}
              className="inline-block px-6 py-3 rounded-xl bg-[#B48EAE] text-white font-medium hover:opacity-90 transition"
            >
              Open Pre-Save Page
            </Link>
            <p className="text-xs opacity-70 mt-2">This keeps the traffic on your site + fires your pixels.</p>
          </div>

          {/* Attempt inline embed; auto-hides if blocked */}
          {iframeAllowed && (
            <div className="relative w-full" style={{ paddingTop: "140%" }}>
              <iframe
                src={HYPERFOLLOW_URL}
                className="absolute inset-0 w-full h-full rounded-xl border-0"
                onLoad={() => { loaded.current = true; }}
                // If the provider sends frame-ancestors/X-Frame-Options, this simply won't render in prod.
              />
            </div>
          )}

          <div className="mt-8 text-center text-xs opacity-60">
            © {new Date().getFullYear()} Marnino — <a href="/" className="underline">Back to home</a>
          </div>
        </div>
      </main>
    </>
  );
}

