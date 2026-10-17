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
        // Expert and gallery uploads are served directly from this S3 bucket.
        // `next/image` rejects remote hosts that are not explicitly allow-listed.
        protocol: 'https',
        hostname: 'sinapsmed-storage.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/images/**',
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
