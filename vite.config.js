// vite.config.js (Fixed: Removed duplicate rollupOptions)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('lucide-react')) return 'icons';  
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('@radix-ui')) return 'ui-radix';  
          if (id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui-utils';
          return null;
        },
      },

      external: [],
    },
    minify: 'terser',
    sourcemap: true,  
  },
  assetsInclude: ['**/*.png?as=webp', '**/*.jpg?as=webp']
});