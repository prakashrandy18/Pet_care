import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getSession, signOut } from '../../lib/supabase'

export default function PortalNav() {
  const [userName, setUserName] = useState('Customer')
  
  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        window.location.href = '/login'
      } else {
        setUserName(session.user?.user_metadata?.full_name || 'Customer')
      }
    })
  }, [])

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  const navItems = [
    { label: 'Dashboard', href: '/portal/dashboard', icon: '🐾' },
    { label: 'My Pets', href: '/portal/pets', icon: '🐕' },
    { label: 'Bookings', href: '/portal/bookings', icon: '📅' },
  ]

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="hidden sm:inline">PS Pet Care</span>
            </a>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath.startsWith(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              Welcome, <span className="font-semibold text-gray-900 dark:text-white">{userName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
