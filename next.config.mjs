// When hosting under a sub-path (e.g. GitHub Pages project sites at
// https://<user>.github.io/<repo>/), set NEXT_PUBLIC_BASE_PATH=/<repo>.
// Left empty for local dev and root-hosted deploys.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
  // Serve assets/links from the sub-path when one is configured
  basePath,
};

export default nextConfig;
