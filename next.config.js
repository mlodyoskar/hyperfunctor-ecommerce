/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'naszsklep-api.vercel.app',
      },
    ],
  },
}

module.exports = nextConfig
