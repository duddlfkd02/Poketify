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
      },
      {
        protocol: "https",
        hostname: "fhecalqtqccmzoqyjytv.supabase.co"
      }
    ],
    domains: ["i.scdn.co", "fhecalqtqccmzoqyjytv.supabase.co"]
  },
  async redirects() {
    return [
      {
        source: "/playlist",
        destination: "/auth",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
