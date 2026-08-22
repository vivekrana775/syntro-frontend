import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
            'removeDimensions',
            { name: 'prefixIds', params: { prefixIds: true } },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
