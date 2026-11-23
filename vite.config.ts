import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// フッターの「最終更新日」を手で書き換え忘れないよう、ビルドした日（日本時間）を埋め込む
const BUILD_DATE = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
  },
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
