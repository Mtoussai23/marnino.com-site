// pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

function trackPageviewWhenReady() {
  if (typeof window === "undefined") return;
  let tries = 0;
  const maxTries = 25; // ~5s total
  const timer = setInterval(() => {
    tries++;
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
      clearInterval(timer);
    } else if (tries >= maxTries) {
      clearInterval(timer);
      // optional: console.warn("fbq not ready; PageView not sent");
    }
  }, 200);
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // on initial load
    trackPageviewWhenReady();

    // on route changes (SPA)
    const handleRouteChange = () => trackPageviewWhenReady();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <div className="relative">
      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
      {/* Grain Overlay (your original) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/textures/grain.mp4"
        className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-50 z-0 mix-blend-softLight"
      />
    </div>
  );
}

export default MyApp;
