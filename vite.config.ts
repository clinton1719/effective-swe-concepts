import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  base: '/effective-swe-concepts/',
  plugins: [react(),
  VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
    manifest: {
      name: "Effective SWE Concepts",
      short_name: "SWE Concepts",
      description: "Learn software concepts the effective way.",
      theme_color: "#111827",
      background_color: "#111827",
      display: "standalone",
      icons: [
        {
          src: '/effective-swe-concepts/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/effective-swe-concepts/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
      globPatterns: ["**/*.{js,css,html,ico,png,svg,json,md}"],
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === "document",
          handler: "NetworkFirst",
        },
        {
          urlPattern: ({ request }) =>
            ["style", "script", "image", "font"].includes(request.destination),
          handler: "CacheFirst",
        },
      ],
    },
  })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
