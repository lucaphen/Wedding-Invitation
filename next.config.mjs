/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — produces a fully static site in `out/`
  output: "export",
  // Required for static export: disable the Next.js image optimization server
  images: {
    unoptimized: true,
  },
  // Emit `path/index.html` so the export works on any static host
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
