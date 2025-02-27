/** @type {import('next').NextConfig} */
const nextConfig = {
      // Keep your existing images configuration
      images: {
        domains: ['i.ytimg.com', 'flagcdn.com'],
      },
      
      // Add Cloudflare Pages compatibility settings
      webpack: (config, { isServer }) => {
        if (isServer) {
          // Exclude problematic Node.js specific modules that Cloudflare doesn't support
          config.externals = [...(config.externals || []), 'async_hooks'];
        }
        return config;
      },
      
      // Improved Edge runtime configuration for Cloudflare
      experimental: {
        runtime: 'edge',
        serverComponents: true,
      },
      
      // Cloudflare Pages specific optimizations
      swcMinify: true,
    };
    
    export default nextConfig;