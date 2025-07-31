import type { APIRoute } from 'astro'
import { siteConfig } from '../config/theme'

export const GET: APIRoute = () => {
  // This is a placeholder since we're using @astrojs/sitemap
  // The actual sitemap will be generated automatically
  return new Response('', {
    status: 301,
    headers: {
      'Location': '/sitemap-index.xml',
    },
  })
}