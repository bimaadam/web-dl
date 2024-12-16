/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: 'https://rest-api-steel-two.vercel.app/api?url=', // Replace dengan URL API
      },
    ];
  },
};
