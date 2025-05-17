/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co'], // ✅ Allow Spotify image URLs
  },
};

export default nextConfig;
