/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.sportmonks.com'],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
