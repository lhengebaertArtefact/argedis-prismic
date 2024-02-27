/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
  cacheStartUrl: false,
});
const prismic = require("@prismicio/client");
const sm = require("./slicemachine.config.json");

const nextConfig = {};

module.exports = withPWA(nextConfig);
