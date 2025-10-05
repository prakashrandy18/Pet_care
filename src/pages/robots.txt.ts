import type { APIRoute } from 'astro'
import { siteConfig } from '../config/theme'

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString() || siteConfig.url
  
  const robotsTxt = `
User-agent: *
Allow: /
Crawl-delay: 1

# Sitemap locations
Sitemap: ${siteUrl}/sitemap-index.xml

# Disallow admin and development areas
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /*.json$
Disallow: /manifest.json

# Allow important assets
Allow: /images/
Allow: /favicon.ico
Allow: /favicon.svg

# Specific bot configurations
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# Block resource-heavy bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: CCBot
Disallow: /

# Mobile crawling
User-agent: Googlebot-Mobile
Allow: /

# Image crawling
User-agent: Googlebot-Image
Allow: /images/
Disallow: /admin/
`.trim()

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}