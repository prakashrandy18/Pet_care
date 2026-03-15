import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============ AUTH ============
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getCustomerProfile() {
  const session = await getSession()
  if (!session) return null

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (customer) return customer

  const { data: newCustomer, error } = await supabase
    .from('customers')
    .insert({
      user_id: session.user.id,
      full_name: session.user.user_metadata?.full_name || 'Customer',
      phone: session.user.user_metadata?.phone || '',
    })
    .select()
    .single()

  if (error) {
    console.error('Failed to create JIT customer profile:', error)
    return null
  }
  return newCustomer
}

// ============ SITE SETTINGS ============
export async function getSiteSettings() {
  const { data, error } = await supabase.from('site_settings').select('*').limit(1).single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateSiteSettings(settings: Record<string, any>) {
  const existing = await getSiteSettings()
  if (existing) {
    const { data, error } = await supabase.from('site_settings').update(settings).eq('id', existing.id).select().single()
    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase.from('site_settings').insert(settings).select().single()
    if (error) throw error
    return data
  }
}

// ============ SERVICES ============
export async function getServices(activeOnly = true) {
  let query = supabase.from('services').select('*').order('sort_order')
  if (activeOnly) query = query.eq('active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createService(service: Record<string, any>) {
  const { data, error } = await supabase.from('services').insert(service).select().single()
  if (error) throw error
  return data
}

export async function updateService(id: string, service: Record<string, any>) {
  const { data, error } = await supabase.from('services').update(service).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteService(id: string) {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

// ============ TESTIMONIALS ============
export async function getTestimonials(activeOnly = true) {
  let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  if (activeOnly) query = query.eq('active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createTestimonial(testimonial: Record<string, any>) {
  const { data, error } = await supabase.from('testimonials').insert(testimonial).select().single()
  if (error) throw error
  return data
}

export async function updateTestimonial(id: string, testimonial: Record<string, any>) {
  const { data, error } = await supabase.from('testimonials').update(testimonial).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}

// ============ TEAM MEMBERS ============
export async function getTeamMembers(activeOnly = true) {
  let query = supabase.from('team_members').select('*').order('sort_order')
  if (activeOnly) query = query.eq('active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createTeamMember(member: Record<string, any>) {
  const { data, error } = await supabase.from('team_members').insert(member).select().single()
  if (error) throw error
  return data
}

export async function updateTeamMember(id: string, member: Record<string, any>) {
  const { data, error } = await supabase.from('team_members').update(member).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  if (error) throw error
}

// ============ GALLERY ============
export async function getGalleryImages(activeOnly = true) {
  let query = supabase.from('gallery_images').select('*').order('sort_order')
  if (activeOnly) query = query.eq('active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createGalleryImage(image: Record<string, any>) {
  const { data, error } = await supabase.from('gallery_images').insert(image).select().single()
  if (error) throw error
  return data
}

export async function deleteGalleryImage(id: string) {
  const { error } = await supabase.from('gallery_images').delete().eq('id', id)
  if (error) throw error
}

// ============ FAQ ============
export async function getFaqItems(activeOnly = true) {
  let query = supabase.from('faq_items').select('*').order('sort_order')
  if (activeOnly) query = query.eq('active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createFaqItem(faq: Record<string, any>) {
  const { data, error } = await supabase.from('faq_items').insert(faq).select().single()
  if (error) throw error
  return data
}

export async function updateFaqItem(id: string, faq: Record<string, any>) {
  const { data, error } = await supabase.from('faq_items').update(faq).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteFaqItem(id: string) {
  const { error } = await supabase.from('faq_items').delete().eq('id', id)
  if (error) throw error
}

// ============ CONTACT SUBMISSIONS ============
export async function getContactSubmissions() {
  const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createContactSubmission(submission: Record<string, any>) {
  const { data, error } = await supabase.from('contact_submissions').insert(submission).select().single()
  if (error) throw error
  return data
}

export async function updateContactSubmissionStatus(id: string, status: string, notes?: string) {
  const update: Record<string, any> = { status }
  if (notes !== undefined) update.admin_notes = notes
  const { data, error } = await supabase.from('contact_submissions').update(update).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function submitContactForm(submission: Record<string, any>) {
  try {
    const data = await createContactSubmission(submission)
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============ BOOKING SUBMISSIONS ============
export async function getBookingSubmissions() {
  const { data, error } = await supabase.from('booking_submissions').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createBookingSubmission(submission: Record<string, any>) {
  const { data, error } = await supabase.from('booking_submissions').insert(submission).select().single()
  if (error) throw error
  return data
}

export async function updateBookingSubmissionStatus(id: string, status: string, notes?: string) {
  const update: Record<string, any> = { status }
  if (notes !== undefined) update.admin_notes = notes
  const { data, error } = await supabase.from('booking_submissions').update(update).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function submitBookingForm(submission: Record<string, any>) {
  try {
    const customer = await getCustomerProfile()
    if (customer) {
      submission.customer_id = customer.id
    }
    
    const data = await createBookingSubmission(submission)
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ============ DASHBOARD STATS ============
export async function getDashboardStats() {
  const [services, testimonials, contacts, bookings] = await Promise.all([
    supabase.from('services').select('id', { count: 'exact' }).eq('active', true),
    supabase.from('testimonials').select('id', { count: 'exact' }).eq('active', true),
    supabase.from('contact_submissions').select('id', { count: 'exact' }),
    supabase.from('booking_submissions').select('id', { count: 'exact' }),
  ])

  const newContacts = await supabase.from('contact_submissions').select('id', { count: 'exact' }).eq('status', 'new')
  const pendingBookings = await supabase.from('booking_submissions').select('id', { count: 'exact' }).eq('status', 'pending')

  return {
    totalServices: services.count || 0,
    totalTestimonials: testimonials.count || 0,
    totalContacts: contacts.count || 0,
    totalBookings: bookings.count || 0,
    newContacts: newContacts.count || 0,
    pendingBookings: pendingBookings.count || 0,
  }
}
