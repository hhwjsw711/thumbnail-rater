/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "necessary-cod-361.convex.cloud",
            },
            {
                hostname: "brave-sheep-556.convex.cloud",
            },
        ],
    },
};

export default nextConfig;
