module.exports = {
  webpack: (config, isServer) => {
    if (isServer) {
      require("./scripts/generate-sitemap.js");
    }
    return config;
  },
  future: {
    webpack5: true,
  },
};