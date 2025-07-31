import { siteConfig } from './theme'

export const defaultSEO = {
  title: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Premium Pet Care Services`
      }
    ]
  },
  twitter: {
    handle: '@pspetcare',
    site: '@pspetcare',
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ]
}

export const pageSEO = {
  home: {
    title: 'Premium Pet Daycare, Grooming & Boarding Services',
    description: 'Ps Pet Care offers professional pet daycare, grooming, boarding, and training services. Your pet\'s happiness and safety is our top priority. Book today!'
  },
  services: {
    title: 'Our Pet Care Services',
    description: 'Explore our comprehensive pet care services including daycare, grooming, boarding, training, dog walking, and pet taxi. Professional care at affordable prices.'
  },
  about: {
    title: 'About Us - Meet Our Team',
    description: 'Learn about Ps Pet Care\'s experienced team and our mission to provide the best care for your pets. Certified professionals dedicated to pet wellness.'
  },
  contact: {
    title: 'Contact Us - Book Your Pet Care Service',
    description: 'Get in touch with Ps Pet Care. Book daycare, grooming, or boarding services. Available 7 days a week. Call, WhatsApp, or visit us today!'
  },
  blog: {
    title: 'Pet Care Blog - Tips, Advice & News',
    description: 'Read our latest articles on pet care, training tips, health advice, and local pet events. Expert insights to help you care for your furry friends.'
  }
}

export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 600,
      height: 60
    },
    image: `${siteConfig.url}/og-image.jpg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '17:00'
      }
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'USD',
    areaServed: {
      '@type': 'City',
      name: siteConfig.address.city
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      siteConfig.social.youtube
    ]
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/storefront.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '17:00'
      }
    ],
    priceRange: '$$'
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  price: { from: number; unit: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.address.city
    },
    offers: {
      '@type': 'Offer',
      price: service.price.from,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: service.price.from,
        priceCurrency: 'USD',
        unitCode: service.price.unit
      }
    }
  }
}