/** @type {import('next').NextConfig} */
const webpack = require('webpack');
module.exports = {
  webpack: (config, { dev }) => {

    config.plugins.push(
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery'
      })
    );

    return config
  },
  reactStrictMode: true,
  eslint: {
   
    ignoreDuringBuilds: false,
  },
}

