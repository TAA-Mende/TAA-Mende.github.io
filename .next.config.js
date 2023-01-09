// next.config.js
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/TAA-Mende.github.io/" : "",
  images: {
    unoptimized: true,
  },
};
