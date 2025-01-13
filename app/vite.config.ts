import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 
  // without `base` works perfectally for `npx`
  //
  base: mode === "production" ? "/wedding-guest-grove-60/" : "/", 
  build: {
    // Define o diretório de saída do build
    outDir: "dist", 

    // Aviso para arquivos grandes no build (ajuste conforme necessário)
    chunkSizeWarningLimit: 1600,

    // Geração de source maps para facilitar a depuração
    sourcemap: mode === "production" ? false : true,
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // Plugin para suporte ao React
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}));
