/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
  env: {
    CAPSTONE_SESSION_TOKEN: process.env.CAPSTONE_SESSION_TOKEN,
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
