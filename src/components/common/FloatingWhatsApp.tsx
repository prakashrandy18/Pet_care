import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../../config/theme'

const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Show tooltip after 5 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true)
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [hasInteracted])

  const handleClick = () => {
    setHasInteracted(true)
    setShowTooltip(false)
    
    // WhatsApp message template
    const message = encodeURIComponent(
      "Hi! I'm interested in your pet care services. Could you please provide more information?"
    )
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* WhatsApp Button - Mobile Optimized */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-30 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:shadow-xl group min-h-[56px] min-w-[56px] touch-manipulation"
        aria-label="Chat on WhatsApp"
      >
        {/* Simple CSS pulse effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        
        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        
        {/* Simple notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 20 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-30 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl max-w-xs"
          >
            <div className="relative">
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900" />
              
              <p className="text-sm font-medium mb-1">Need help? Chat with us! 🐾</p>
              <p className="text-xs text-gray-300">
                We're here to answer your questions about our pet care services.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-optimized tooltip */}
      <div
        className={`fixed inset-x-4 bottom-24 z-30 md:hidden transition-all duration-300 ${
          showTooltip ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                Chat with PS Pet Care
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Hi! 👋 Questions about our services?
              </p>
              <button
                onClick={handleClick}
                className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm min-h-[44px]"
              >
                Start Chat
              </button>
            </div>
            <button
              onClick={() => {
                setShowTooltip(false)
                setHasInteracted(true)
              }}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FloatingWhatsApp