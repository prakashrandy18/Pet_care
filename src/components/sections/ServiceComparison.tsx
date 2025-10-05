import React, { useState } from 'react'
import { SERVICES } from '../../config/constants'

const ServiceComparison: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<'half-day' | 'full-day' | 'overnight'>('full-day')

  const getPricing = (serviceId: string, duration: string) => {
    const service = SERVICES.find(s => s.id === serviceId)
    if (!service) return 0
    
    if (serviceId === 'daycare') {
      return duration === 'half-day' ? Math.round(service.price.from * 0.7) : service.price.from
    }
    return service.price.from
  }

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>💰</span>
            <span>Pricing Calculator</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Choose What's Right for Your Pet
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See pricing for different care options and find the perfect fit for your pet's needs
          </p>
        </div>

        {/* Duration Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: 'half-day', label: 'Half Day', desc: '4 hours' },
              { key: 'full-day', label: 'Full Day', desc: '8 hours' },
              { key: 'overnight', label: 'Overnight', desc: 'With boarding' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedDuration(option.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedDuration === option.key
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div>{option.label}</div>
                <div className="text-xs opacity-75">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Service Comparison */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SERVICES.map((service) => {
            const price = selectedDuration === 'overnight' && service.id === 'boarding' 
              ? service.price.from
              : selectedDuration === 'overnight' && service.id === 'daycare'
              ? null 
              : getPricing(service.id, selectedDuration)

            if (selectedDuration === 'overnight' && service.id === 'daycare') {
              return null
            }

            return (
              <div key={service.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
                <div className="text-center">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      ₹{price}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      per {service.price.unit}
                    </div>
                  </div>

                  <ul className="text-left space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://forms.gle/YJ4bxyNAo1SmQ92v9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                  >
                    Book {service.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServiceComparison