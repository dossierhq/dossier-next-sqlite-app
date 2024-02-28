/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@dossierhq/design', '@dossierhq/react-components'],
  },
};

export default config;
