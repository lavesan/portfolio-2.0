const withImages = require('next-images');
const withFonts = require('next-fonts');
const withPlugins = require("next-compose-plugins");
const withCSS = require('@zeit/next-css')

module.exports = withPlugins(
  [
    withImages,
    withFonts,
    withCSS,
  ],
  {
    distDir: "./.next",
  },
);
