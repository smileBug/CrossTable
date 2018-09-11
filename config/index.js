const path = require('path');

module.exports = {
  common: {
    
  },
  dev: {
    title: 'smile',
    // path
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',


    port: 8080,
    autoOpenBrowser: true,
    // source maps
    devtool: 'inline-source-map',
  },
  build: {
    // path
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // source maps
    devtool: 'source-map',
  }
}