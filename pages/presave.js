// pages/presave.js
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const HYPERFOLLOW_URL = "https://distrokid.com/hyperfollow/marninotoussaint/nostalgia";
const withUTM = (url) =>
  `${url}${url.includes("?") ? "&" : "?"}utm_source=marnino.com&utm_medium=presave_page&utm_campaign=nostalgia`;

// Hide the iframe on production so no broken box appears
const SHOW_IFRAME = process.env.NODE_ENV !== "production";

export default function PresavePage() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (window.fbq) window.fbq("trackCustom", "PresavePageView");
        if (window.gtag) window.gtag("event", "page_view", { page_title: "Presave" });
      }
    } catch {}
  }, []);

  const handleClick = () => {
    try {
      if (typeof window !== "undefined") {
        if (window.fbq) window.fbq("trackCustom", "PreSaveClick", { source: "presave_page" });
        if (window.gtag) window.gtag("event", "pre_save_click", { event_category: "engagement" });
      }
    } catch {}
  };

  return (
    <>
      <Head>
        <title>Pre-Save “Nostalgia” — Marnino</title>
        <meta
          name="description"
          content="Pre-save Marnino’s new single 'Nostalgia' so you get it first when it drops!"
        />
      </Head>

      <main className="min-h-screen bg-[#EAE5DF] text-[#1C1C1C] flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold">Pre-Save “Nostalgia”</h1>
            <p className="opacity-80 mt-2">
              Lock it in so it shows up in your library on release day.
            </p>
          </div>

          {/* Clean single CTA button */}
          <div className="text-center mb-6">
            <Link
              href={withUTM(HYPERFOLLOW_URL)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-block px-6 py-3 rounded-xl bg-[#B48EAE] text-white font-medium hover:opacity-90 transition"
            >
              Open Pre-Save Page
            </Link>
          </div>

          {/* Show iframe only in local/dev, never on live site */}
          {SHOW_IFRAME && (
            <div className="relative w-full" style={{ paddingTop: "140%" }}>
              <iframe
                src={withUTM(HYPERFOLLOW_URL)}
                className="absolute inset-0 w-full h-full rounded-xl border-0"
                title="Pre-save widget (dev only)"
              />
            </div>
          )}

          <div className="mt-8 text-center text-xs opacity-60">
            © {new Date().getFullYear()} Marnino —{" "}
            <a href="/" className="underline">
              Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
