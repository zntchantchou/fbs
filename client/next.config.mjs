/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manage-picture-bucket-666.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
