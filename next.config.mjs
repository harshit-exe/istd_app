/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.linkedin.com', 'media.licdn.com'],
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig; // Correct ESM syntax
