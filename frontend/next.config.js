module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['kr.object.ncloudstorage.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};
