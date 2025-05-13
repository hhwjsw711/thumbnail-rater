/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "chatty-frog-699.convex.cloud",
      },
      {
        hostname: "insightful-yak-199.convex.cloud",
      },
      {
        hostname: "thumbnailrater.com",
      },
    ],
  },
};

module.exports = nextConfig;
