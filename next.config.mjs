/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co"
      },
      {
        protocol: "https",
        hostname: "thisis-images.spotifycdn.com"
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co"
      }
    ]
  }
};

export default nextConfig;
