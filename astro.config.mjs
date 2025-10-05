// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pspetcare.in',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      customPages: [
        'https://pspetcare.in/',
        'https://pspetcare.in/services',
        'https://pspetcare.in/about',
        'https://pspetcare.in/contact'
      ],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000
    })
  ],
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    optimizeDeps: {
      exclude: []
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
            'react-vendor': ['react', 'react-dom'],
            'utils': ['clsx', 'tailwind-merge']
          }
        }
      },
      cssCodeSplit: true,
      minify: 'terser'
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
