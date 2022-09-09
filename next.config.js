/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack: (config) => {
		if (!config.experiments) {
			config.experiments = {};
		}
		config.experiments.topLevelAwait = true;
		return config;
	},
	images: {
		domains: ['avatars.githubusercontent.com'],
	},
};

module.exports = nextConfig;
