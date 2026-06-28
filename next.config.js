const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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
      {
        source: '/docs/vue/api',
        destination: '/docs/core/classes',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
