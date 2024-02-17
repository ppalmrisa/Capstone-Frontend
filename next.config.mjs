/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   ];
  // },
  env: {
    CAPSTONE_SESSION_TOKEN: process.env.CAPSTONE_SESSION_TOKEN || 'capstone-session-token',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  output: 'export',
  // Add basePath
  // basePath: '/github-pages',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
