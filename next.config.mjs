/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Ensure proper routing for Azure Static Web Apps
  trailingSlash: false,
  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
