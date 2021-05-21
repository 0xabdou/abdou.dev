const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  webpack: (config, isServer) => {
    if (isServer) {
      require("./scripts/generate-sitemap.js");
    }
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
  future: {
    webpack5: true,
  },
};