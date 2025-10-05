import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PetLoaderProps {
  onLoadComplete?: () => void
  minLoadTime?: number
}

export const PetLoader: React.FC<PetLoaderProps> = ({ 
  onLoadComplete, 
  minLoadTime = 500 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Ensure minimum load time for animation
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadComplete) {
        setTimeout(onLoadComplete, 500) // Wait for fade animation
      }
    }, minLoadTime)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadTimer)
    }
  }, [minLoadTime, onLoadComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50"
        >
          {/* Running Pet Animation */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                x: [-50, 50],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              className="relative"
            >
              {/* Pet SVG */}
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="drop-shadow-lg"
              >
                <motion.g
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Dog Body */}
                  <ellipse cx="60" cy="70" rx="25" ry="20" fill="#8B4513" />
                  
                  {/* Dog Head */}
                  <circle cx="60" cy="45" r="18" fill="#8B4513" />
                  
                  {/* Ears */}
                  <ellipse cx="45" cy="40" rx="8" ry="15" fill="#654321" transform="rotate(-30 45 40)" />
                  <ellipse cx="75" cy="40" rx="8" ry="15" fill="#654321" transform="rotate(30 75 40)" />
                  
                  {/* Eyes */}
                  <circle cx="52" cy="45" r="3" fill="#000" />
                  <circle cx="68" cy="45" r="3" fill="#000" />
                  <circle cx="53" cy="44" r="1" fill="#fff" />
                  <circle cx="69" cy="44" r="1" fill="#fff" />
                  
                  {/* Nose */}
                  <ellipse cx="60" cy="52" rx="3" ry="2" fill="#000" />
                  
                  {/* Mouth */}
                  <path d="M60 52 Q55 55 50 52" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M60 52 Q65 55 70 52" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Tail */}
                  <motion.path
                    d="M35 65 Q20 55 25 45"
                    fill="none"
                    stroke="#8B4513"
                    strokeWidth="8"
                    strokeLinecap="round"
                    animate={{
                      d: ["M35 65 Q20 55 25 45", "M35 65 Q15 60 20 50", "M35 65 Q20 55 25 45"]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Legs with running animation */}
                  <motion.g
                    animate={{
                      rotate: [0, 20, -20, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <rect x="45" y="75" width="6" height="15" rx="3" fill="#8B4513" />
                    <rect x="69" y="75" width="6" height="15" rx="3" fill="#8B4513" />
                  </motion.g>
                  
                  <motion.g
                    animate={{
                      rotate: [0, -20, 20, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <rect x="55" y="75" width="6" height="15" rx="3" fill="#8B4513" />
                    <rect x="59" y="75" width="6" height="15" rx="3" fill="#8B4513" />
                  </motion.g>
                  
                  {/* Collar */}
                  <rect x="45" y="58" width="30" height="4" rx="2" fill="#f97316" />
                  <circle cx="60" cy="60" r="3" fill="#FFD700" />
                </motion.g>
              </svg>
            </motion.div>
            
            {/* Paw prints trail */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 1.2, 1],
                    rotate: [-45, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="w-4 h-4 bg-accent-400 rounded-paw"
                />
              ))}
            </div>
          </div>
          
          {/* Loading Text */}
          <motion.h2
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-2xl font-display font-bold text-primary-600 mb-4"
          >
            Loading Pet Paradise...
          </motion.h2>
          
          {/* Progress Bar */}
          <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-400 to-accent-400"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(loadProgress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Loading percentage */}
          <motion.p
            className="mt-2 text-sm text-gray-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Math.min(Math.round(loadProgress), 100)}% Complete
          </motion.p>
          
          {/* Fun loading messages */}
          <motion.p
            key={Math.floor(loadProgress / 25)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-sm text-gray-500"
          >
            {loadProgress < 25 && "Gathering the toys..."}
            {loadProgress >= 25 && loadProgress < 50 && "Preparing the treats..."}
            {loadProgress >= 50 && loadProgress < 75 && "Fluffing the beds..."}
            {loadProgress >= 75 && "Almost ready for playtime!"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PetLoader