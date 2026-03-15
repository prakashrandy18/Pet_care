import { useState, useEffect } from 'react'
import { getServices, getTestimonials, getFaqItems, getGalleryImages, getSiteSettings } from './supabase'

// Shared in-memory cache to avoid redundant fetches across components
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_TTL = 60_000 // 1 minute

async function fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache[key]
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }
  const data = await fetcher()
  cache[key] = { data, timestamp: Date.now() }
  return data
}

// Generic data hook
function useSupabaseData<T>(key: string, fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchWithCache(key, fetcher)
      .then(result => { if (!cancelled) { setData(result); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false) } })
    return () => { cancelled = true }
  }, [key])

  return { data, loading, error }
}

// ============ Typed Hooks ============

export function useServices() {
  return useSupabaseData('services', () => getServices(true), [])
}

export function useTestimonials() {
  return useSupabaseData('testimonials', () => getTestimonials(true), [])
}

export function useFaqItems() {
  return useSupabaseData('faq_items', () => getFaqItems(true), [])
}

export function useGalleryImages() {
  return useSupabaseData('gallery_images', () => getGalleryImages(true), [])
}

export function useSiteSettings() {
  return useSupabaseData('site_settings', () => getSiteSettings(), null)
}

// Transform DB service to match the original constants format for backwards compatibility
export function mapDbServiceToLegacy(service: any) {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon || '🐾',
    features: service.features || [],
    price: { from: service.price_from, unit: service.price_unit },
    image: service.image_url || `/images/services/${service.title?.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  }
}

// Transform DB testimonial to match original format
export function mapDbTestimonialToLegacy(t: any) {
  return {
    id: t.id,
    author: t.author,
    petName: t.pet_name,
    petType: t.pet_type,
    rating: t.rating,
    text: t.text,
    image: t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.author)}&background=a855f7&color=fff&size=100`,
  }
}

// Transform DB FAQ to match original format
export function mapDbFaqToLegacy(f: any) {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
  }
}
