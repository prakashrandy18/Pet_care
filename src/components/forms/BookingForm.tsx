import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '../../config/constants'

interface BookingData {
  service: string
  date: string
  time: string
  duration: string
  petName: string
  petType: string
  petAge: string
  specialNeeds: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
}

const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    service: '',
    date: '',
    time: '',
    duration: '',
    petName: '',
    petType: 'dog',
    petAge: '',
    specialNeeds: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const totalSteps = 3

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM'
  ]

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (currentStep === 1) {
      if (!bookingData.service) newErrors.service = 'Please select a service'
      if (!bookingData.date) newErrors.date = 'Please select a date'
      if (!bookingData.time) newErrors.time = 'Please select a time'
      if (!bookingData.duration && bookingData.service === 'daycare') {
        newErrors.duration = 'Please select duration'
      }
    } else if (currentStep === 2) {
      if (!bookingData.petName) newErrors.petName = 'Pet name is required'
      if (!bookingData.petAge) newErrors.petAge = 'Pet age is required'
    } else if (currentStep === 3) {
      if (!bookingData.ownerName) newErrors.ownerName = 'Your name is required'
      if (!bookingData.ownerEmail) newErrors.ownerEmail = 'Email is required'
      if (!bookingData.ownerPhone) newErrors.ownerPhone = 'Phone is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(3)) {
      // Store booking data in localStorage
      const bookings = JSON.parse(localStorage.getItem('bookingSubmissions') || '[]')
      const newBooking = {
        ...bookingData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString()
      }
      bookings.push(newBooking)
      localStorage.setItem('bookingSubmissions', JSON.stringify(bookings))
      
      // Show success message
      alert('Booking confirmed! We will contact you shortly.')
      
      // Reset form
      setBookingData({
        service: '',
        date: '',
        time: '',
        duration: '',
        petName: '',
        petType: 'dog',
        petAge: '',
        specialNeeds: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: ''
      })
      setStep(1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <motion.div
                animate={{
                  backgroundColor: step >= i ? '#3b82f6' : '#e5e7eb',
                  scale: step === i ? 1.1 : 1
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= i ? 'text-white' : 'text-gray-400'
                }`}
              >
                {step > i ? '✓' : i}
              </motion.div>
              {i < 3 && (
                <motion.div
                  animate={{
                    backgroundColor: step > i ? '#3b82f6' : '#e5e7eb'
                  }}
                  className="w-full h-1 mx-2"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            Service & Time
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            Pet Details
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            Your Info
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Step 1: Service & Time */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Select Service & Time
              </h3>

              <div>
                <label className="form-label">Service</label>
                <select
                  name="service"
                  value={bookingData.service}
                  onChange={handleChange}
                  className={`form-input ${errors.service ? 'border-red-500' : ''}`}
                >
                  <option value="">Choose a service...</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.icon} {service.title} - From ₹{service.price.from}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="form-error">{errors.service}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`form-input ${errors.date ? 'border-red-500' : ''}`}
                  />
                  {errors.date && <p className="form-error">{errors.date}</p>}
                </div>

                <div>
                  <label className="form-label">Time</label>
                  <select
                    name="time"
                    value={bookingData.time}
                    onChange={handleChange}
                    className={`form-input ${errors.time ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="form-error">{errors.time}</p>}
                </div>
              </div>

              {bookingData.service === 'daycare' && (
                <div>
                  <label className="form-label">Duration</label>
                  <select
                    name="duration"
                    value={bookingData.duration}
                    onChange={handleChange}
                    className={`form-input ${errors.duration ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select duration...</option>
                    <option value="half-day">Half Day (4 hours)</option>
                    <option value="full-day">Full Day (8 hours)</option>
                  </select>
                  {errors.duration && <p className="form-error">{errors.duration}</p>}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Pet Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Tell Us About Your Pet
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Pet's Name</label>
                  <input
                    type="text"
                    name="petName"
                    value={bookingData.petName}
                    onChange={handleChange}
                    className={`form-input ${errors.petName ? 'border-red-500' : ''}`}
                    placeholder="Buddy"
                  />
                  {errors.petName && <p className="form-error">{errors.petName}</p>}
                </div>

                <div>
                  <label className="form-label">Pet Type</label>
                  <select
                    name="petType"
                    value={bookingData.petType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="dog">🐕 Dog</option>
                    <option value="cat">🐈 Cat</option>
                    <option value="birds">🦜 Birds</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Pet Age</label>
                <input
                  type="text"
                  name="petAge"
                  value={bookingData.petAge}
                  onChange={handleChange}
                  className={`form-input ${errors.petAge ? 'border-red-500' : ''}`}
                  placeholder="e.g., 2 years"
                />
                {errors.petAge && <p className="form-error">{errors.petAge}</p>}
              </div>

              <div>
                <label className="form-label">Special Needs or Instructions (Optional)</label>
                <textarea
                  name="specialNeeds"
                  value={bookingData.specialNeeds}
                  onChange={handleChange}
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Any allergies, medications, or special care instructions..."
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Owner Information */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Your Contact Information
              </h3>

              <div>
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={bookingData.ownerName}
                  onChange={handleChange}
                  className={`form-input ${errors.ownerName ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.ownerName && <p className="form-error">{errors.ownerName}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={bookingData.ownerEmail}
                    onChange={handleChange}
                    className={`form-input ${errors.ownerEmail ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.ownerEmail && <p className="form-error">{errors.ownerEmail}</p>}
                </div>

                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={bookingData.ownerPhone}
                    onChange={handleChange}
                    className={`form-input ${errors.ownerPhone ? 'border-red-500' : ''}`}
                    placeholder="9962203484"
                  />
                  {errors.ownerPhone && <p className="form-error">{errors.ownerPhone}</p>}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Booking Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Service:</span>
                    <span className="font-medium">
                      {SERVICES.find(s => s.id === bookingData.service)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-medium">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Time:</span>
                    <span className="font-medium">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Pet:</span>
                    <span className="font-medium">{bookingData.petName}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <motion.button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Previous
            </motion.button>
          )}

          {step < totalSteps ? (
            <motion.button
              type="button"
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              className="ml-auto px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm Booking
              <span>🐾</span>
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  )
}

export default BookingForm