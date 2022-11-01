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
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/products',
				destination: '/products/p/1',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
