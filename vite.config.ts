import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  // One HTML file per page, so /work/ and /services/ are real addresses on any static host.
  build: {
    rollupOptions: {
      input: { main: page('./index.html'), work: page('./work/index.html'), services: page('./services/index.html') },
    },
  },
  // host: true also serves the dev site on the local network, for checking it on a phone.
  server: { port: 5173, host: true },
})
