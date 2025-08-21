/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "exam.elevateegy.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
