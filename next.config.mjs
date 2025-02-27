/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com', 'flagcdn.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['async_hooks'] = require.resolve('./polyfills/async_hooks.js');
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['async_hooks'],
  },
};

export default nextConfig;