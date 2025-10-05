import { motion } from "framer-motion";
import React from "react";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: "🐾",
      title: "25+ Years Experience",
      description:
        "We've been caring for dogs, cats, and birds for over 25 years.",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: "🏠",
      title: "Home-Like Environment",
      description:
        "A comfortable, familiar setting where pets feel relaxed and happy.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: "❤️",
      title: "Individual Attention",
      description: "Every pet gets personal care tailored to their needs.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: "🐕🐈🦆",
      title: "Multiple Pet Experience",
      description:
        "Experienced with dogs, cats, and birds - we understand different pet needs.",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const stats = [
    { number: "25+", label: "Years Experience", icon: "📅" },
    { number: "3", label: "Types of Pets", icon: "🐾" },
    { number: "100%", label: "Customer Satisfaction", icon: "😊" },
    { number: "24/7", label: "Available Support", icon: "🏥" },
  ];

  return (
    <section
      id="why-choose-us"
      role="region"
      aria-labelledby="why-choose-heading"
      className="section-padding bg-white dark:bg-gray-950"
    >
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

          <h2 id="why-choose-heading" className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Why <span className="text-gradient">Choose Us</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your pets deserve care from people who truly understand and love them.
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-20`}
                  />
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/50 bg-repeat" />
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
                  stiffness: 200,
                }}
                className="text-center text-white"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Trusted by pet parents across the city
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "25+ Years Experience",
              "Dogs, Cats & Birds",
              "Personal Attention",
              "Your Pets Are Safe",
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <span className="text-green-500">✓</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {badge}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
