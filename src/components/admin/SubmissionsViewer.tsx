import React, { useState, useEffect } from 'react'
import { getContactSubmissions, getBookingSubmissions, updateContactSubmissionStatus, updateBookingSubmissionStatus } from '../../lib/supabase'

interface Props {
  showToast: (msg: string, type?: 'success' | 'error') => void
}

type ViewTab = 'contacts' | 'bookings'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400',
  read: 'bg-gray-500/15 text-gray-400',
  responded: 'bg-green-500/15 text-green-400',
  archived: 'bg-gray-700 text-gray-500',
  pending: 'bg-amber-500/15 text-amber-400',
  confirmed: 'bg-green-500/15 text-green-400',
  in_progress: 'bg-blue-500/15 text-blue-400',
  completed: 'bg-emerald-500/15 text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

export default function SubmissionsViewer({ showToast }: Props) {
  const [tab, setTab] = useState<ViewTab>('contacts')
  const [contacts, setContacts] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      const [c, b] = await Promise.all([getContactSubmissions(), getBookingSubmissions()])
      setContacts(c); setBookings(b)
    } catch (err: any) { showToast(err.message, 'error') }
    setLoading(false)
  }

  const updateContactStatus = async (id: string, status: string) => {
    try { await updateContactSubmissionStatus(id, status); showToast(`Status updated to ${status}`); load() }
    catch (err: any) { showToast(err.message, 'error') }
  }

  const updateBookingStatus = async (id: string, status: string) => {
    try { await updateBookingSubmissionStatus(id, status); showToast(`Booking status updated to ${status}`); load() }
    catch (err: any) { showToast(err.message, 'error') }
  }

  const newContactsCount = contacts.filter(c => c.status === 'new').length
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length

  if (loading) return <div className="animate-pulse space-y-3">{[1,2,3].map(i => <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-32"></div>)}</div>

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Form Submissions</h3>
        <p className="text-sm text-gray-400">View and manage customer inquiries and bookings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-3">
        <button onClick={() => setTab('contacts')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${tab === 'contacts' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-white'}`}>
          📩 Contact Inquiries
          {newContactsCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{newContactsCount}</span>}
        </button>
        <button onClick={() => setTab('bookings')}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${tab === 'bookings' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-white'}`}>
          📅 Bookings
          {pendingBookingsCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingBookingsCount}</span>}
        </button>
      </div>

      {/* Contact Submissions */}
      {tab === 'contacts' && (
        <div className="space-y-4">
          {contacts.map(c => (
            <div key={c.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{c.name}</h4>
                  <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString('en-IN')}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize ${STATUS_COLORS[c.status] || ''}`}>{c.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div><span className="text-gray-500">Email:</span> <span className="text-gray-300 ml-1">{c.email}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="text-gray-300 ml-1">{c.phone || '–'}</span></div>
                <div><span className="text-gray-500">Pet:</span> <span className="text-gray-300 ml-1">{c.pet_name || '–'} ({c.pet_type || '–'})</span></div>
                <div><span className="text-gray-500">Service:</span> <span className="text-gray-300 ml-1">{c.service || '–'}</span></div>
              </div>
              {c.message && <p className="text-sm text-gray-400 bg-gray-800/50 rounded-xl p-3 mb-3">"{c.message}"</p>}
              <div className="flex gap-2 flex-wrap">
                {['new', 'read', 'responded', 'archived'].map(s => (
                  <button key={s} onClick={() => updateContactStatus(c.id, s)} disabled={c.status === s}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors capitalize ${c.status === s ? 'bg-purple-500/20 text-purple-400 font-medium' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}>
                    {s}
                  </button>
                ))}
                <a href={`https://wa.me/${c.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener"
                  className="px-3 py-1 text-xs text-green-400 hover:bg-green-500/10 rounded-lg transition-colors ml-auto">
                  💬 WhatsApp
                </a>
                <a href={`mailto:${c.email}`} className="px-3 py-1 text-xs text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                  ✉️ Email
                </a>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <div className="text-center py-12 text-gray-500"><span className="text-4xl mb-4 block">📩</span><p>No contact submissions yet.</p></div>}
        </div>
      )}

      {/* Booking Submissions */}
      {tab === 'bookings' && (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold">{b.owner_name}</h4>
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-lg font-mono">{b.booking_id}</span>
                  </div>
                  <p className="text-xs text-gray-500">{new Date(b.created_at).toLocaleString('en-IN')}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize ${STATUS_COLORS[b.status] || ''}`}>{b.status.replace('_', ' ')}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div><span className="text-gray-500">Service:</span> <span className="text-gray-300 ml-1">{b.service}</span></div>
                <div><span className="text-gray-500">Date:</span> <span className="text-gray-300 ml-1">{b.date}</span></div>
                <div><span className="text-gray-500">Pet:</span> <span className="text-gray-300 ml-1">{b.pet_name} ({b.pet_type || '–'})</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="text-gray-300 ml-1">{b.owner_phone}</span></div>
              </div>
              {b.special_needs && <p className="text-sm text-gray-400 bg-gray-800/50 rounded-xl p-3 mb-3">Special needs: {b.special_needs}</p>}
              <div className="flex gap-2 flex-wrap">
                {['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(s => (
                  <button key={s} onClick={() => updateBookingStatus(b.id, s)} disabled={b.status === s}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors capitalize ${b.status === s ? 'bg-purple-500/20 text-purple-400 font-medium' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
                <a href={`https://wa.me/${b.owner_phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener"
                  className="px-3 py-1 text-xs text-green-400 hover:bg-green-500/10 rounded-lg transition-colors ml-auto">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <div className="text-center py-12 text-gray-500"><span className="text-4xl mb-4 block">📅</span><p>No booking submissions yet.</p></div>}
        </div>
      )}
    </div>
  )
}
