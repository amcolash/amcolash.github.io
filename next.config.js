const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  trailingSlash: true,
  productionBrowserSourceMaps: true,

  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact
    Object.assign(config.resolve.alias, {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(config);
