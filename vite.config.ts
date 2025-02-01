import { reactRouter } from "@react-router/dev/vite"
import autoprefixer from "autoprefixer"
import { reactRouterDevTools } from "react-router-devtools"
import { reactRouterHonoServer } from "react-router-hono-server/dev"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    strictPort: false,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    reactRouterDevTools(),
    reactRouterHonoServer({ runtime: "bun" }),
    reactRouter(),
    tsconfigPaths(),
  ],
})
