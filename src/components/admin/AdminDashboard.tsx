import React, { useState, useEffect } from 'react'
import { getDashboardStats, getContactSubmissions, getBookingSubmissions } from '../../lib/supabase'
import ServiceManager from './ServiceManager'
import TestimonialManager from './TestimonialManager'
import GalleryManager from './GalleryManager'
import FaqManager from './FaqManager'
import SubmissionsViewer from './SubmissionsViewer'
import SettingsManager from './SettingsManager'

type Tab = 'dashboard' | 'services' | 'gallery' | 'testimonials' | 'faqs' | 'submissions' | 'settings'

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'services', label: 'Services & Pricing', icon: '💰' },
  { id: 'gallery', label: 'Gallery', icon: '📸' },
  { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
  { id: 'faqs', label: 'FAQs', icon: '❓' },
  { id: 'submissions', label: 'Submissions', icon: '📝' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

interface Props {
  session: any
  onLogout: () => void
}

export default function AdminDashboard({ session, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [stats, setStats] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const loadStats = async () => {
    try {
      const s = await getDashboardStats()
      setStats(s)
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview stats={stats} onNavigate={setActiveTab} />
      case 'services':
        return <ServiceManager showToast={showToast} />
      case 'gallery':
        return <GalleryManager showToast={showToast} />
      case 'testimonials':
        return <TestimonialManager showToast={showToast} />
      case 'faqs':
        return <FaqManager showToast={showToast} />
      case 'submissions':
        return <SubmissionsViewer showToast={showToast} />
      case 'settings':
        return <SettingsManager showToast={showToast} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-900 border-r border-gray-800 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🐾</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Ps Pet Care</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
                {item.id === 'submissions' && stats?.newContacts + stats?.pendingBookings > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {stats.newContacts + stats.pendingBookings}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-3 py-2 mb-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{session?.user?.email}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-white">
              {NAV_ITEMS.find(n => n.id === activeTab)?.icon} {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </h2>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  )
}

// ============ DASHBOARD OVERVIEW ============
function DashboardOverview({ stats, onNavigate }: { stats: any; onNavigate: (tab: Tab) => void }) {
  const cards = [
    { label: 'Active Services', value: stats?.totalServices ?? '–', icon: '🐾', color: 'from-purple-500 to-purple-600', tab: 'services' as Tab },
    { label: 'Testimonials', value: stats?.totalTestimonials ?? '–', icon: '⭐', color: 'from-amber-500 to-orange-500', tab: 'testimonials' as Tab },
    { label: 'New Inquiries', value: stats?.newContacts ?? '–', icon: '📩', color: 'from-blue-500 to-cyan-500', tab: 'submissions' as Tab },
    { label: 'Pending Bookings', value: stats?.pendingBookings ?? '–', icon: '📅', color: 'from-pink-500 to-rose-500', tab: 'submissions' as Tab },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-2">Welcome back! 👋</h3>
        <p className="text-gray-400">Manage your pet care business from this dashboard. Update services, prices, gallery, and more.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => onNavigate(card.tab)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all duration-200 text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                {card.value}
              </div>
            </div>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{card.label}</p>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'Update Pricing', icon: '💰', tab: 'services' as Tab },
            { label: 'Upload Photos', icon: '📸', tab: 'gallery' as Tab },
            { label: 'View Inquiries', icon: '📝', tab: 'submissions' as Tab },
            { label: 'Add Testimonial', icon: '⭐', tab: 'testimonials' as Tab },
            { label: 'Edit FAQs', icon: '❓', tab: 'faqs' as Tab },
            { label: 'Business Settings', icon: '⚙️', tab: 'settings' as Tab },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.tab)}
              className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200"
            >
              <span className="text-lg">{action.icon}</span>
              {action.label}
              <svg className="w-4 h-4 ml-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
