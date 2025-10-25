// pages/presave.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HYPERFOLLOW_URL = "https://distrokid.com/hyperfollow/marninotoussaint/nostalgia";

export default function PresavePage() {
  const [iframeWorks, setIframeWorks] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    // If the iframe doesn’t load in 2s, show fallback
    const t = setTimeout(() => {
      if (!loaded.current) setIframeWorks(false);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>Pre-Save “Nostalgia” — Marnino</title>
        <meta
          name="description"
          content="Pre-save Marnino’s new single 'Nostalgia' so you get it first when it drops!"
        />
      </Head>

      <main className="min-h-screen bg-[#EAE5DF] flex flex-col items-center justify-center p-6 text-center text-[#1C1C1C]">
        <h1 className="text-3xl font-semibold mb-4">Pre-Save “Nostalgia”</h1>
        <p className="mb-6 opacity-80">
          Add it to your library so you’re the first to hear it on release day.
        </p>

        {iframeWorks ? (
          <div className="w-full max-w-2xl" style={{ height: "80vh" }}>
            <iframe
              src={HYPERFOLLOW_URL}
              className="w-full h-full rounded-xl border-0"
              onLoad={() => {
                loaded.current = true;
              }}
            />
          </div>
        ) : (
          <Link
            href={HYPERFOLLOW_URL}
            target="_blank"
            className="px-6 py-3 rounded-xl bg-[#B48EAE] text-white font-medium hover:opacity-90 transition"
          >
            Open Pre-Save Page
          </Link>
        )}

        <p className="mt-6 text-xs opacity-70">
          © {new Date().getFullYear()} Marnino —{" "}
          <a href="/" className="underline">
            Back to home
          </a>
        </p>
      </main>
    </>
  );
}
