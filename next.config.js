/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.graphassets.com',
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
