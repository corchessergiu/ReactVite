import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP",
  plugins: [react()],
  server: {
    port: 8000,
    host: true,
  },
});
