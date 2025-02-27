/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com', 'flagcdn.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['async_hooks'] = new URL('./polyfills/async_hooks.js', import.meta.url).pathname;
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['async_hooks'],
  },
};

export default nextConfig;