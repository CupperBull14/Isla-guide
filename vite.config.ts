import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE задаётся при деплое на GitHub Pages (например, /Isla-guide/); локально и на Vercel/Netlify — '/'.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  return {
    base: env.VITE_BASE || '/',
    plugins: [react()],
  }
})
