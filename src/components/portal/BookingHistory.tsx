import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, getSession, getCustomerProfile } from '../../lib/supabase'

interface Booking {
  id: string
  booking_id: string
  service: string
  date: string
  time: string
  pet_name: string
  pet_type: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
}

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [customerId, setCustomerId] = useState<string | null>(null)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const session = await getSession()
      if (!session) return

      // 1. Get or create the customer record
      const customer = await getCustomerProfile()
        
      if (!customer) {
         setLoading(false)
         return
      }
      
      setCustomerId(customer.id)

      // 2. Fetch their bookings
      const { data: userBookings } = await supabase
        .from('booking_submissions')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })
        
      setBookings(userBookings || [])
    } catch (err) {
      console.error('Error loading bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <span className="px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">Confirmed</span>
      case 'in_progress': return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-semibold">In Progress</span>
      case 'completed': return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 rounded-full text-xs font-semibold">Completed</span>
      case 'cancelled': return <span className="px-2.5 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-semibold">Cancelled</span>
      case 'pending': 
      default: return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-semibold">Pending Review</span>
    }
  }

  // Formatting date
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your schedule...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Service History</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Track your past and upcoming reservations</p>
        </div>
        <a 
          href="/contact"
          className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors shadow-sm whitespace-nowrap"
        >
          Book Now
        </a>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl border-dashed">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">You don't have any past or upcoming service reservations.</p>
          <a 
            href="/contact"
            className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
          >
            Create Your First Booking
          </a>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Service</th>
                  <th className="p-4 hidden sm:table-cell">Date & Time</th>
                  <th className="p-4 hidden md:table-cell">Pet</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="text-sm font-mono text-gray-900 dark:text-gray-300">
                        {booking.booking_id || `#...${booking.id.slice(-6)}`}
                      </div>
                      <div className="text-xs text-gray-500 sm:hidden mt-1">
                        {formatDate(booking.date)} at {booking.time}
                      </div>
                      <div className="text-xs text-gray-500 md:hidden mt-0.5">
                        {booking.pet_name}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {booking.service}
                    </td>
                    <td className="p-4 hidden sm:table-cell text-gray-600 dark:text-gray-400">
                      <div>{formatDate(booking.date)}</div>
                      <div className="text-sm">{booking.time}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{booking.pet_type?.toLowerCase() === 'cat' ? '🐈' : '🐕'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-300">{booking.pet_name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(booking.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
