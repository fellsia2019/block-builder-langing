/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // В CI не требуем наличия eslint и не падаем из-за предупреждений
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig