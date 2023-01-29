/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
  },
  output: 'standalone',
};

export default config;
