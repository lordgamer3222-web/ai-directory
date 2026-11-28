import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const clientRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:5001" },
    fs: { allow: [".."] },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(clientRoot, "index.html"),
        compare: resolve(clientRoot, "compare.html"),
        aiSearch: resolve(clientRoot, "ai-search.html"),
        about: resolve(clientRoot, "about.html"),
        contact: resolve(clientRoot, "contact.html"),
        privacyPolicy: resolve(clientRoot, "privacy-policy.html"),
        terms: resolve(clientRoot, "terms-and-conditions.html"),
        admin: resolve(clientRoot, "admin.html"),
        notFound: resolve(clientRoot, "404.html"),
      },
    },
  },
});
