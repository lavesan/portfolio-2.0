const withImages = require('next-images');
const withFonts = require('next-fonts');
const withPlugins = require("next-compose-plugins");
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

module.exports = withPlugins(
  [
    withCSS,
    withFonts,
    withImages,
    withTypescript,
  ],
  {
    distDir: "./.next",
  },
);
