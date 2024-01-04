/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
const dotenv = require("dotenv");
dotenv.config();

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};
