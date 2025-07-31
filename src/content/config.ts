import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updateDate: z.date().optional(),
    author: z.string().default('Ps Pet Care Team'),
    category: z.enum([
      'pet-care-tips',
      'health-wellness',
      'training',
      'local-events',
      'success-stories'
    ]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false)
  })
})

export const collections = {
  blog
}