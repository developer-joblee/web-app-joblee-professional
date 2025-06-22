import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Joblee - Profissional',
        short_name: 'Joblee',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-expect-error */
        strategies: 'injectManifest', // Importante para usar SW customizado
        srcDir: 'public',
        filename: 'sw.js',
        push_messaging: true,
        categories: [
          'job',
          'services',
          'professional',
          'productivity',
          'utilities',
          'business',
          'communication',
          'personalization',
        ],
        id: 'joblee-professional-pwa-app',
        description: 'Joblee - Profissional',
        theme_color: '#6759ff',
        background_color: '#6759ff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        icons: [
          {
            src: 'https://i.postimg.cc/prVJBR3W/pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'https://i.postimg.cc/PxQMZP3V/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'https://i.postimg.cc/yY2B2djb/128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'https://i.postimg.cc/qBQLv6Cz/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'https://i.postimg.cc/G3qmgd6W/256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'https://i.postimg.cc/qMRGhB8Q/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        gcm_sender_id: '708447937247',
      },
      workbox: {
        sourcemap: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              // cacheKeyWillBeUsed: async ({ request }) => {
              //   return `${request.url}?${Date.now()}`;
              // },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
});
