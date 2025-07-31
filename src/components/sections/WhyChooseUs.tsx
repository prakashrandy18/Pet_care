import React from 'react'
import { motion } from 'framer-motion'

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: '🏥',
      title: '24/7 Veterinary Support',
      description: 'On-call vet support ensures your pet\'s health is always our priority.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: '👥',
      title: 'Experienced Staff',
      description: 'Our certified team has over 50+ years of combined pet care experience.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🏠',
      title: 'Spacious Facilities',
      description: '10,000 sq ft of indoor and outdoor play areas for maximum comfort.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📱',
      title: 'Real-Time Updates',
      description: 'Get photos, videos, and updates throughout your pet\'s stay with us.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🛡️',
      title: 'Fully Licensed & Insured',
      description: 'Complete peace of mind with our comprehensive insurance coverage.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🌟',
      title: 'Personalized Care',
      description: 'Customized care plans tailored to your pet\'s unique needs.',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const stats = [
    { number: '5000+', label: 'Happy Pets Served', icon: '🐾' },
    { number: '15+', label: 'Years Experience', icon: '📅' },
    { number: '100%', label: 'Customer Satisfaction', icon: '😊' },
    { number: '24/7', label: 'Available Support', icon: '🏥' }
  ]

  return (
    <section id="why-choose-us" className="section-padding bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <span>✨</span>
            <span>Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            The <span className="text-gradient">Best Care</span> for Your Best Friend
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We go above and beyond to ensure your pet receives the highest quality care in a loving, safe environment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-xl transition-all duration-300">
                {/* Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative inline-flex items-center justify-center w-16 h-16 mb-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-20`} />
                  <span className="relative text-3xl">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative py-12 px-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-paw-pattern bg-repeat" />
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  duration: 0.5,
                  delay: index * 0.1,
                  stiffness: 200
                }}
                className="text-center text-white"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="text-4xl mb-2"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Trusted by pet parents across the city</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Pet Care Certified', 'BBB Accredited', 'IBPSA Member', 'Award Winner 2023'].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <span className="text-green-500">✓</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs