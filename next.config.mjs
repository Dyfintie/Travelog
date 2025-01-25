/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dribbble.com','cdn.dribbble.com'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**", // Adjust the path as necessary
      },
    ],
  },
};

export default nextConfig;
