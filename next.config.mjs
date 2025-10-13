/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  // Enable compression
  compress: true,
  // Optimize for production
  poweredByHeader: false,
  // Support for Server-Sent Events
  async headers() {
    return [
      {
        source: '/api/tee-logs-ws',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-transform',
          },
          {
            key: 'Content-Type',
            value: 'text/event-stream',
          },
          {
            key: 'Connection',
            value: 'keep-alive',
          },
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ];
  },
};

export default nextConfig;



