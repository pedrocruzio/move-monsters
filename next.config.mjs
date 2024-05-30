import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript', 'json', 'rust'],
      })
    );
    return config;
  },
};

export default nextConfig;
