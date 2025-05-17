import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <div className="relative">
      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
      {/* Grain Overlay */}
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

