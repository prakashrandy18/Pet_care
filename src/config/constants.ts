export const SERVICES = [
  {
    id: 'daycare',
    title: 'Pet Daycare',
    description: 'Caring for your pets while you\'re at work or away for the day.',
    icon: '🏠',
    features: ['Daytime care', 'Regular feeding', 'Comfortable rest areas', 'Personal attention', 'Safe environment', 'WhatsApp updates'],
    price: { from: 500, unit: 'day' },
    image: '/images/services/daycare.jpg'
  },
  {
    id: 'boarding',
    title: 'Pet Boarding',
    description: 'A safe place for your pets to stay when you travel or need overnight care.',
    icon: '🛏️',
    features: ['Overnight stays', 'Round-the-clock care', 'Regular meals', 'Comfortable sleeping areas', 'Daily updates', 'Emergency support'],
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
    author: 'Akash Ramesh',
    petName: 'Charlie',
    petType: 'Beagle',
    rating: 5,
    text: "PS Pet Care has been amazing for Charlie! They understand his beagle energy and give him the perfect balance of play and rest. Very satisfied with their care and WhatsApp updates throughout the day.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    author: 'Priya Subramanian',
    petName: 'Kutty',
    petType: 'Indian Spitz',
    rating: 5,
    text: "Kutty loves going to PS Pet Care! They treat him like family. The home-based environment makes such a difference - he's never stressed when I drop him off.",
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    author: 'Rajesh Kumar',
    petName: 'Mani',
    petType: 'Persian Cat',
    rating: 5,
    text: "I was worried about leaving Mani for 3 days, but PS Pet Care took excellent care of him. Regular updates and photos gave me peace of mind during my business trip.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    author: 'Lakshmi Venkatesh',
    petName: 'Rocky',
    petType: 'Labrador Mix',
    rating: 5,
    text: "Rocky has been going to PS Pet Care for 6 months now. The care is so personal and loving. They really understand each pet's individual needs.",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    author: 'Arun Muthu',
    petName: 'Simba',
    petType: 'Golden Retriever',
    rating: 5,
    text: "Excellent service! Simba gets excited every time we reach their place. The staff is very caring and professional. Highly recommend for pet daycare in Chennai.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  }
] as const

export const FAQ_ITEMS = [
  {
    id: 'requirements',
    question: 'What are the requirements for pet daycare and boarding?',
    answer: 'All pets must be up-to-date on vaccinations and have health certificates. We require documentation before admission to ensure the safety of all pets in our care.'
  },
  {
    id: 'hours',
    question: 'What are your operating hours?',
    answer: 'We are open Monday-Friday 7:00 AM - 8:00 PM, Saturday 8:00 AM - 6:00 PM, and Sunday 9:00 AM - 5:00 PM. Boarding pets have 24/7 care.'
  },
  {
    id: 'booking',
    question: 'How do I book services?',
    answer: 'Contact us via WhatsApp at 9962203484 or through our website. Advance booking is required.'
  },
  {
    id: 'pricing',
    question: 'What are your rates?',
    answer: 'Daycare starts at ₹500 per day, and boarding starts at ₹800 per night. We offer discounts for weekly and monthly packages.'
  },
  {
    id: 'updates',
    question: 'Will I receive updates about my pet?',
    answer: 'Yes, we provide regular updates via WhatsApp to keep you informed about your pet\'s wellbeing.'
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
  { name: '25+ Years Experience', icon: '🐾' },
  { name: 'Dogs, Cats & Birds', icon: '🐕' },
  { name: 'Home-Like Care', icon: '🏠' },
  { name: 'Trusted by Neighbors', icon: '❤️' }
] as const