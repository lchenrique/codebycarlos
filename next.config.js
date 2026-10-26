/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: true,
  serverExternalPackages: ["geoip-lite"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
