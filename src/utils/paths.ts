/**
 * Utility function to get the correct image path for both development and production
 * @param path - The path to the image relative to the public directory (e.g., 'img/logo.png')
 * @returns The full path to the image
 */
export const getImagePath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  // Use the BASE_URL from environment variables or fallback to '/'
  const base = process.env.BASE_URL || '/';
  // Ensure there's exactly one slash between base and path
  return `${base}${cleanPath}`;
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
