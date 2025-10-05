import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  name: string
  email: string
  phone: string
  petName: string
  petType: 'dog' | 'cat' | 'birds'
  service: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: 'dog',
    service: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const services = [
    'Pet Daycare',
    'Pet Boarding'
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Woof! We need your name 🐕'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Meow! Email is required 🐈'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ruff! Please enter a valid email 🐾'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Ring ring! Phone number is needed 📞'
    }

    if (!formData.petName.trim()) {
      newErrors.petName = "What's your pet's name? 🦴"
    }

    if (!formData.service) {
      newErrors.service = 'Pick a service for your furry friend! 🎾'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Store form data in localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    const newSubmission = {
      ...formData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    }
    submissions.push(newSubmission)
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions))

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          petName: '',
          petType: 'dog',
          service: '',
          message: ''
        })
        setShowSuccess(false)
      }, 3000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/30 bg-repeat" />
      </div>

      <div className="relative space-y-6">
        {/* Form Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-4"
          >
            🐾
          </motion.div>
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Let's Get in Touch!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tell us about your pet and how we can help
          </p>
        </div>

        {/* Owner Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="John Doe"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="form-error"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'border-red-500' : ''}`}
              placeholder="john@example.com"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="form-error"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="9962203484"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="form-error"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Pet Information */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🐕</span> Pet Information
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="petName" className="form-label">
                Pet's Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                className={`form-input ${errors.petName ? 'border-red-500' : ''}`}
                placeholder="Buddy"
              />
              <AnimatePresence>
                {errors.petName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="form-error"
                  >
                    {errors.petName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="petType" className="form-label">
                Pet Type
              </label>
              <select
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="dog">🐕 Dog</option>
                <option value="cat">🐈 Cat</option>
                <option value="birds">🦜 Birds</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <label htmlFor="service" className="form-label">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`form-input ${errors.service ? 'border-red-500' : ''}`}
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.service && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="form-error"
              >
                {errors.service}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="form-label">
            Additional Information (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="form-input resize-none"
            placeholder="Tell us more about your pet's needs..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || showSuccess}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            showSuccess
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 hover:shadow-lg'
          }`}
          whileHover={{ scale: showSuccess ? 1 : 1.02 }}
          whileTap={{ scale: showSuccess ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Sending...
            </>
          ) : showSuccess ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Message Sent!
            </>
          ) : (
            <>
              Send Message
              <span className="text-xl">🐾</span>
            </>
          )}
        </motion.button>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center rounded-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Woof! Message Received!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll contact you within 24 hours
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  )
}

export default ContactForm