import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // // // base: "/wedding-guest-grove-60/app/dist/",
  // // base: mode === "production" ? "/wedding-guest-grove-60/app/" : "/", // Base path for production
  // base: "/wedding-guest-grove-60/app/",
  
  base: "/wedding-guest-grove-60/",

  // 
  // without `base` works perfectally for `npx`
  //
  
  build: {
    // outDir: "/app/dist",
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // mode === 'development' && componentTagger(),
    componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}));
