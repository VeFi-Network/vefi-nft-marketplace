/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-email-validator']);
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');

const pwaConfig = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching
  }
});

module.exports = withPlugins([withTM], {
  ...pwaConfig,
  webpack: (config, { isServer }) => {
    if (!isServer)
      config.resolve.fallback = {
        fs: require.resolve('browserify-fs'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        querystring: require.resolve('querystring-browser'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify')
      };
    return config;
  }
});
