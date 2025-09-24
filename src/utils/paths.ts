/**
 * Utility function to get the correct image path for both development and production
 * @param path - The path to the image relative to the public directory (e.g., 'img/logo.png')
 * @returns The full path to the image
 */
export const getImagePath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development or when running locally, use the path as is
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, use the base URL (for GitHub Pages)
  // The base URL should be set in vite.config.ts
  const base = import.meta.env.BASE_URL || '/';
  
  // Remove any trailing slashes from base and leading slashes from path
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  
  return `${normalizedBase}/${normalizedPath}`;
};

/**
 * Utility function to import images in a way that works with Vite and GitHub Pages
 * @param path - The path to the image relative to the src directory
 * @returns The URL to the image
 */
export const importImage = (path: string): string => {
  try {
    return new URL(`/src/${path}`, import.meta.url).href;
  } catch (err) {
    console.warn(`Image not found: ${path}`, err);
    return '';
  }
};
