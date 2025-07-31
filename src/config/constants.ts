export const SERVICES = [
  {
    id: 'daycare',
    title: 'Pet Daycare',
    description: 'Safe and fun environment for your pets to play and socialize',
    icon: '🏠',
    features: ['Supervised playtime', 'Socialization', 'Rest areas', 'Fresh water & treats'],
    price: { from: 35, unit: 'day' },
    image: '/images/services/daycare.jpg'
  },
  {
    id: 'grooming',
    title: 'Professional Grooming',
    description: 'Complete grooming services to keep your pet looking their best',
    icon: '✂️',
    features: ['Bath & blow dry', 'Hair trimming', 'Nail clipping', 'Ear cleaning'],
    price: { from: 45, unit: 'session' },
    image: '/images/services/grooming.jpg'
  },
  {
    id: 'boarding',
    title: 'Pet Boarding',
    description: 'Comfortable overnight stays with 24/7 care and attention',
    icon: '🛏️',
    features: ['Private suites', '24/7 supervision', 'Daily exercise', 'Video updates'],
    price: { from: 65, unit: 'night' },
    image: '/images/services/boarding.jpg'
  },
  {
    id: 'training',
    title: 'Training Classes',
    description: 'Professional training to help your pet learn good behaviors',
    icon: '🎓',
    features: ['Basic obedience', 'Advanced tricks', 'Behavior correction', 'Group classes'],
    price: { from: 50, unit: 'class' },
    image: '/images/services/training.jpg'
  },
  {
    id: 'walking',
    title: 'Dog Walking',
    description: 'Regular walks to keep your dog healthy and happy',
    icon: '🚶',
    features: ['30-60 min walks', 'GPS tracking', 'Photo updates', 'Flexible scheduling'],
    price: { from: 25, unit: 'walk' },
    image: '/images/services/walking.jpg'
  },
  {
    id: 'taxi',
    title: 'Pet Taxi',
    description: 'Safe transportation for your pet to and from our facility',
    icon: '🚗',
    features: ['Door-to-door service', 'Climate controlled', 'Safety harnesses', 'Insured drivers'],
    price: { from: 20, unit: 'trip' },
    image: '/images/services/taxi.jpg'
  }
] as const

export const TEAM_MEMBERS = [
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    role: 'Founder & Lead Trainer',
    bio: 'With over 15 years of experience in pet care, Sarah founded Ps Pet Care to provide the best possible care for your furry friends.',
    image: '/images/team/sarah.jpg',
    certifications: ['Certified Dog Trainer', 'Pet First Aid', 'Animal Behavior Specialist']
  },
  {
    id: 'mike',
    name: 'Mike Chen',
    role: 'Head Groomer',
    bio: 'Mike is our master groomer with expertise in breed-specific cuts and gentle handling techniques.',
    image: '/images/team/mike.jpg',
    certifications: ['Master Groomer Certification', 'Pet Styling Expert']
  },
  {
    id: 'emily',
    name: 'Emily Rodriguez',
    role: 'Daycare Supervisor',
    bio: 'Emily ensures all pets have a safe and fun time during their stay with us.',
    image: '/images/team/emily.jpg',
    certifications: ['Animal Care Certified', 'Pet CPR Trained']
  },
  {
    id: 'david',
    name: 'David Thompson',
    role: 'Veterinary Assistant',
    bio: 'David provides medical support and ensures the health and wellness of all pets in our care.',
    image: '/images/team/david.jpg',
    certifications: ['Veterinary Assistant', 'Pet Health Specialist']
  }
] as const

export const TESTIMONIALS = [
  {
    id: 1,
    author: 'Jennifer Martinez',
    petName: 'Max',
    petType: 'Golden Retriever',
    rating: 5,
    text: "I can't say enough good things about Ps Pet Care! Max always comes home happy and tired after his daycare visits. The staff truly cares about each pet.",
    image: '/images/testimonials/jennifer.jpg'
  },
  {
    id: 2,
    author: 'Robert Wilson',
    petName: 'Luna',
    petType: 'Persian Cat',
    rating: 5,
    text: "Luna is usually very shy, but the team at Ps Pet Care made her feel so comfortable. The grooming service is exceptional!",
    image: '/images/testimonials/robert.jpg'
  },
  {
    id: 3,
    author: 'Amanda Lee',
    petName: 'Charlie',
    petType: 'Labrador',
    rating: 5,
    text: "The training classes have transformed Charlie! He's so well-behaved now. The trainers are patient and knowledgeable.",
    image: '/images/testimonials/amanda.jpg'
  },
  {
    id: 4,
    author: 'Michael Brown',
    petName: 'Bella',
    petType: 'French Bulldog',
    rating: 5,
    text: "Bella loves her walks with the Ps Pet Care team. The GPS tracking gives me peace of mind, and the photo updates are wonderful!",
    image: '/images/testimonials/michael.jpg'
  }
] as const

export const FAQ_ITEMS = [
  {
    id: 'requirements',
    question: 'What are the requirements for pet daycare?',
    answer: 'All pets must be up-to-date on vaccinations, including rabies, DHPP (dogs), and FVRCP (cats). Pets should also be spayed/neutered if over 6 months old and be sociable with other animals.'
  },
  {
    id: 'hours',
    question: 'What are your operating hours?',
    answer: 'We are open Monday-Friday 7:00 AM - 7:00 PM, Saturday 8:00 AM - 6:00 PM, and Sunday 9:00 AM - 5:00 PM. We also offer 24/7 boarding services.'
  },
  {
    id: 'booking',
    question: 'How do I book services?',
    answer: 'You can book services through our website, call us directly, or use our WhatsApp booking service. We recommend booking at least 24 hours in advance.'
  },
  {
    id: 'emergency',
    question: 'What happens in case of a medical emergency?',
    answer: 'We have a veterinary assistant on staff and partnerships with local emergency veterinary clinics. We will contact you immediately and follow your pre-registered emergency instructions.'
  },
  {
    id: 'feeding',
    question: 'Can I bring my pet\'s own food?',
    answer: 'Absolutely! We encourage you to bring your pet\'s regular food to maintain their diet. We also provide high-quality pet food if needed.'
  },
  {
    id: 'updates',
    question: 'Will I receive updates about my pet?',
    answer: 'Yes! We provide regular updates including photos and videos throughout the day. For boarding pets, we offer daily video calls upon request.'
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
  { name: 'Pet Care Certified', icon: '🏆' },
  { name: 'Fully Insured', icon: '🛡️' },
  { name: '24/7 Veterinary Support', icon: '🏥' },
  { name: 'Member of IBPSA', icon: '🤝' }
] as const