// Prefix for assets referenced by raw URL (e.g. <img src>), which Next.js does
// NOT auto-prefix with `basePath` the way it does for next/image and <Link>.
// Matches `basePath` in next.config.mjs via the same env var.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prepend the configured base path to a root-relative asset URL. */
export const withBasePath = (path: string): string => `${basePath}${path}`;
