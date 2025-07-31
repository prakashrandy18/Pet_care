import type { APIRoute } from 'astro'
import { siteConfig } from '../config/theme'

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString() || siteConfig.url
  
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml

# Crawl-delay for bots that support it
User-agent: *
Crawl-delay: 1

# Disallow access to admin or private areas (if any)
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_astro/

# Allow search engines to access everything else
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Block bad bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`.trim()

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}