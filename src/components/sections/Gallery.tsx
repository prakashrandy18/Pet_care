import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: 'dogs' | 'cats' | 'grooming' | 'playing'
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const galleryImages: GalleryImage[] = [
    { id: 1, src: '/images/gallery/happy-dog-1.jpg', alt: 'Happy golden retriever playing', category: 'dogs' },
    { id: 2, src: '/images/gallery/cat-grooming.jpg', alt: 'Cat being groomed', category: 'grooming' },
    { id: 3, src: '/images/gallery/dogs-playing.jpg', alt: 'Dogs playing together', category: 'playing' },
    { id: 4, src: '/images/gallery/happy-cat-1.jpg', alt: 'Content cat resting', category: 'cats' },
    { id: 5, src: '/images/gallery/dog-grooming.jpg', alt: 'Dog getting a bath', category: 'grooming' },
    { id: 6, src: '/images/gallery/puppy-play.jpg', alt: 'Puppies playing with toys', category: 'playing' },
    { id: 7, src: '/images/gallery/happy-dog-2.jpg', alt: 'Smiling labrador', category: 'dogs' },
    { id: 8, src: '/images/gallery/cat-playing.jpg', alt: 'Cat playing with feather toy', category: 'cats' },
  ]

  const categories = [
    { id: 'all', label: 'All Pets', icon: '🐾' },
    { id: 'dogs', label: 'Dogs', icon: '🐕' },
    { id: 'cats', label: 'Cats', icon: '🐈' },
    { id: 'grooming', label: 'Grooming', icon: '✂️' },
    { id: 'playing', label: 'Playing', icon: '🎾' }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <section id="gallery" className="section-padding bg-white dark:bg-gray-950">
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
            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <span>📸</span>
            <span>Gallery</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Happy Moments at <span className="text-gradient">Ps Pet Care</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Take a peek at the joy and fun happening every day at our facility!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedImage(image)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 aspect-square"
              >
                {/* Placeholder image with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900" />
                
                {/* Image would go here in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-6xl opacity-20"
                  >
                    🐾
                  </motion.div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4"
                >
                  <div className="text-white">
                    <p className="font-medium">{image.alt}</p>
                    <p className="text-sm opacity-80">Click to view</p>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {categories.find(c => c.id === image.category)?.icon}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Image Container */}
                <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-9xl opacity-20"
                    >
                      🐾
                    </motion.div>
                  </div>
                </div>

                {/* Image Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedImage.alt}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Another happy moment captured at Ps Pet Care! Our furry friends love spending time with us.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to see your pet featured in our gallery?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Pet Family
            <span className="text-xl">❤️</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery