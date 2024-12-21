/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exciting-spell.pockethost.io",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
