/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  serverExternalPackages: ["geoip-lite"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
