import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // путь к твоему setup-файлу
    globals: true, // чтобы не импортировать expect в каждом тесте
  },
  plugins: [react()],
});
