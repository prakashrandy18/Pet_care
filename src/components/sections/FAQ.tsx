import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '../../config/constants'
import { siteConfig } from '../../config/theme'

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <span>❓</span>
            <span>FAQ</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Got questions? We've got answers! Here are some of the most common questions we receive.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 text-primary-600 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                          {item.answer}
                        </div>
                        
                        {/* Additional helpful links based on question */}
                        {item.id === 'booking' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4"
                          >
                            <a
                              href="/contact#booking"
                              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium"
                            >
                              Book Now
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </motion.div>
                        )}
                        
                        {item.id === 'hours' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
                          >
                            <p className="text-sm font-medium text-primary-700 dark:text-primary-400">
                              💡 Pro tip: Book your weekend slots early as they fill up quickly!
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-3xl p-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🤔
              </motion.div>
              
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Still have questions?
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our friendly team is here to help! Reach out to us anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={`tel:${siteConfig.phone || '+15551234567'}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </motion.a>
                
                <motion.a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQ