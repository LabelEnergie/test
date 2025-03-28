/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  output: 'standalone',
  experimental: {
    appDir: true
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Configuration des logs détaillés pour Next.js 14.2.3
      config.devtool = 'cheap-module-source-map';
      config.stats = 'verbose';
      // Suppression de la configuration DefinePlugin qui causait l'erreur
    }
    
    // Optimize chunk loading
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    };

    return config;
  },
}

module.exports = nextConfig