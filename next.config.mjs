/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.linkedin.com', 'media.licdn.com'],

  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      type: 'javascript/auto', // Allows CommonJS imports
    });
    return config;
  },
};

export default nextConfig;
