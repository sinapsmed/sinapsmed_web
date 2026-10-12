import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-one-time-password-input'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sinapsmedstorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rootapi.sinapsmed.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'baseapi.sinapsmed.com', 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
