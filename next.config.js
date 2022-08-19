const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === '1',
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          titleProp: true,
        },
      },
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withBundleAnalyzer(config);
