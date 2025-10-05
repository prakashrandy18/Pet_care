import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '../../config/constants'

const Testimonials: React.FC = () => {

  return (
    <section 
      id="testimonials" 
      className="section-padding bg-gray-50 dark:bg-gray-900 overflow-hidden"
      role="region"
      aria-labelledby="testimonials-heading"
    >
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
            className="inline-flex items-center gap-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <span>💬</span>
            <span>Testimonials</span>
          </motion.div>
          
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            What Pet Parents Say
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the families who trust us with their beloved pets.
          </p>
        </motion.div>

        {/* Testimonials Static Grid - Performance Optimized */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto min-h-[300px]">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <footer className="flex items-center gap-3 mt-auto">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.author} - PS Pet Care customer`}
                  className="w-12 h-12 rounded-full object-cover"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <cite className="font-semibold text-gray-900 dark:text-white not-italic">
                    {testimonial.author}
                  </cite>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pet Parent of {testimonial.petName} ({testimonial.petType})
                  </p>
                </div>
              </footer>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join hundreds of happy pet parents!
          </p>
          <motion.a
            href="https://forms.gle/YJ4bxyNAo1SmQ92v9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Pet Daycare Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials