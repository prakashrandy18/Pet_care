// Form data storage utilities using localStorage

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  petName: string
  petType: 'dog' | 'cat' | 'birds'
  service: string
  message: string
  submittedAt: string
}

export interface BookingSubmission {
  id: string
  service: string
  date: string
  time: string
  duration: string
  petName: string
  petType: string
  petAge: string
  specialNeeds: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  submittedAt: string
}

// Contact form functions
export const getContactSubmissions = (): ContactSubmission[] => {
  try {
    const data = localStorage.getItem('contactSubmissions')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading contact submissions:', error)
    return []
  }
}

export const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission => {
  const newSubmission: ContactSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString()
  }
  
  const submissions = getContactSubmissions()
  submissions.push(newSubmission)
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
  
  return newSubmission
}

// Booking form functions
export const getBookingSubmissions = (): BookingSubmission[] => {
  try {
    const data = localStorage.getItem('bookingSubmissions')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading booking submissions:', error)
    return []
  }
}

export const addBookingSubmission = (submission: Omit<BookingSubmission, 'id' | 'submittedAt'>): BookingSubmission => {
  const newSubmission: BookingSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString()
  }
  
  const bookings = getBookingSubmissions()
  bookings.push(newSubmission)
  localStorage.setItem('bookingSubmissions', JSON.stringify(bookings))
  
  return newSubmission
}

// Clear all submissions (for development/testing)
export const clearAllSubmissions = () => {
  localStorage.removeItem('contactSubmissions')
  localStorage.removeItem('bookingSubmissions')
}

// Export all submissions as JSON (for backup/viewing)
export const exportAllSubmissions = () => {
  return {
    contacts: getContactSubmissions(),
    bookings: getBookingSubmissions(),
    exportedAt: new Date().toISOString()
  }
}