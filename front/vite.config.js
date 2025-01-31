import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import tailwindcss from '@tailwindcss/vite';
import path from "path";

export default defineConfig({
  plugins: [
    react(),  // Ensures JSX works properly
    //tailwindcss(),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),  // This resolves '@' to your 'src' directory
    },
  },
});
