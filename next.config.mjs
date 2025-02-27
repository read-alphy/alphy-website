/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        domains: ['i.ytimg.com', 'flagcdn.com'],
      },
      // Add Cloudflare compatibility settings
      webpack: (config, { isServer }) => {
        if (isServer) {
          // Exclude problematic Node.js modules
          config.externals = [...(config.externals || []), 'async_hooks'];
        }
        return config;
      },
      // Simplified experimental config compatible with Next.js 14.1.0
      experimental: {
        instrumentationHook: true,
      },
      // Enable edge runtime at the global config level
      swcMinify: true,
    };
    
    export default nextConfig;