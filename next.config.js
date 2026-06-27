/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/docs/core/getting-started',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/docs/migration',
        destination: '/docs/get-started',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
