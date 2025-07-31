export const SERVICES = [
  {
    id: 'daycare',
    title: 'Pet Daycare',
    description: 'Safe and fun environment for your pets during the day. Perfect for working pet parents.',
    icon: '🏠',
    features: ['Supervised playtime', 'Socialization with other pets', 'Rest areas', 'Fresh water & meals', 'Indoor & outdoor play areas', 'Live updates'],
    price: { from: 500, unit: 'day' },
    image: '/images/services/daycare.jpg'
  },
  {
    id: 'boarding',
    title: 'Pet Boarding',
    description: 'Comfortable stays from overnight to monthly. Your pet\'s home away from home.',
    icon: '🛏️',
    features: ['Private rooms', '24/7 supervision', 'Daily exercise & playtime', 'Video updates', 'Customized meal plans', 'Emergency vet support'],
    price: { from: 800, unit: 'night' },
    image: '/images/services/boarding.jpg'
  }
] as const

export const TEAM_MEMBERS = [
  {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Founder & Pet Care Expert',
    bio: 'With over 10 years of experience in pet care, Priya founded Ps Pet Care to provide the best possible care for your furry and feathered friends.',
    image: '/images/team/priya.jpg',
    certifications: ['Certified Pet Care Professional', 'Pet First Aid', 'Animal Behavior Specialist']
  },
  {
    id: 'raj',
    name: 'Raj Kumar',
    role: 'Operations Manager',
    bio: 'Raj ensures smooth operations and that every pet receives personalized attention during their stay.',
    image: '/images/team/raj.jpg',
    certifications: ['Animal Care Certified', 'Pet CPR Trained']
  },
  {
    id: 'anitha',
    name: 'Dr. Anitha Reddy',
    role: 'Veterinary Consultant',
    bio: 'Dr. Anitha provides medical guidance and ensures the health and wellness of all pets in our care.',
    image: '/images/team/anitha.jpg',
    certifications: ['BVSc & AH', 'MVSc']
  }
] as const

export const TESTIMONIALS = [
  {
    id: 1,
    author: 'Kavitha Krishnan',
    petName: 'Bruno',
    petType: 'Golden Retriever',
    rating: 5,
    text: "Excellent care for Bruno! The team is very professional and loving. I can go to work peacefully knowing Bruno is in safe hands.",
    image: '/images/testimonials/kavitha.jpg'
  },
  {
    id: 2,
    author: 'Arjun Menon',
    petName: 'Mitthu',
    petType: 'African Grey Parrot',
    rating: 5,
    text: "Finding a place that cares for birds was difficult until we found Ps Pet Care. Mitthu loves his time there!",
    image: '/images/testimonials/arjun.jpg'
  },
  {
    id: 3,
    author: 'Sneha Patel',
    petName: 'Simba',
    petType: 'Persian Cat',
    rating: 5,
    text: "The boarding facility is excellent! Simba was well taken care of during our vacation. Daily video updates were a blessing!",
    image: '/images/testimonials/sneha.jpg'
  }
] as const

export const FAQ_ITEMS = [
  {
    id: 'requirements',
    question: 'What are the requirements for pet daycare and boarding?',
    answer: 'All pets must be up-to-date on vaccinations. Dogs need rabies and DHPP, cats need rabies and FVRCP, and birds need a health certificate. Pets should be sociable with other animals.'
  },
  {
    id: 'hours',
    question: 'What are your operating hours?',
    answer: 'We are open Monday-Friday 7:00 AM - 8:00 PM, Saturday 8:00 AM - 6:00 PM, and Sunday 9:00 AM - 5:00 PM. Boarding pets have 24/7 care.'
  },
  {
    id: 'booking',
    question: 'How do I book services?',
    answer: 'You can book through our website contact form or WhatsApp us at 9962203484. We recommend booking at least 24 hours in advance.'
  },
  {
    id: 'pricing',
    question: 'What are your rates?',
    answer: 'Daycare starts at ₹500 per day, and boarding starts at ₹800 per night. We offer discounts for weekly and monthly packages.'
  },
  {
    id: 'updates',
    question: 'Will I receive updates about my pet?',
    answer: 'Yes! We send WhatsApp updates with photos and videos throughout the day. You can also call us anytime to check on your pet.'
  }
] as const

export const BLOG_CATEGORIES = [
  { id: 'pet-care-tips', name: 'Pet Care Tips', slug: 'pet-care-tips' },
  { id: 'health-wellness', name: 'Health & Wellness', slug: 'health-wellness' },
  { id: 'training', name: 'Training', slug: 'training' },
  { id: 'local-events', name: 'Local Events', slug: 'local-events' },
  { id: 'success-stories', name: 'Success Stories', slug: 'success-stories' }
] as const

export const CERTIFICATIONS = [
  { name: 'Licensed Pet Care', icon: '🏆' },
  { name: 'Fully Insured', icon: '🛡️' },
  { name: 'Vet Support', icon: '🏥' },
  { name: '10+ Years Experience', icon: '⭐' }
] as const