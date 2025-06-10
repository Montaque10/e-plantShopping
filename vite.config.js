import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Set the base path to your GitHub repository name
  // This tells Vite where your application will be served from on GitHub Pages.
  base: "/e-plantShopping/", // Updated to match your repository name
});
