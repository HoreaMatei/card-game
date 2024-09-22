/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["a.storyblok.com"],
  },
  env: {
    KEY: process.env.KEY,
  },
};

export default nextConfig;
