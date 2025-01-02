/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: "hardy-panda-359.convex.cloud",
      },
      {
        hostname: "thumbnailrater.com",
      },
    ],
  },
};

module.exports = nextConfig;
