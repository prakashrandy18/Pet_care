import React, { useState } from 'react'
import { FAQ_ITEMS } from '../../config/constants'

const QuickFAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <section 
      className="section-padding bg-gray-50 dark:bg-gray-900"
      role="region"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>❓</span>
            <span>Quick Answers</span>
          </div>
          
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Common Questions
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Quick answers to help you make the best decision for your pet's care
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                aria-expanded={openItem === item.id}
                aria-controls={`faq-${item.id}`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                  {item.question}
                </h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openItem === item.id ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                id={`faq-${item.id}`}
                className={`transition-all duration-300 ease-in-out ${
                  openItem === item.id 
                    ? 'max-h-40 opacity-100' 
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Have more questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Contact PS Pet Care
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default QuickFAQ