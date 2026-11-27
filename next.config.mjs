/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
  },
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
