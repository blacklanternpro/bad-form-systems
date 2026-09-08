import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "0.0.0.0",
    "172.30.0.2",
    "*.cursor.sh",
    "**.cursor.sh",
    "*.cursorusercontent.com",
    "**.cursorusercontent.com",
  ],
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
