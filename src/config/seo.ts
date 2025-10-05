import { siteConfig } from "./theme";

export const defaultSEO = {
  title: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Pet Care Services`,
      },
    ],
  },
  twitter: {
    handle: "@pspetcare",
    site: "@pspetcare",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
};

export const pageSEO = {
  home: {
    title: "Pet Daycare Chennai | PS Pet Care Avadi",
    description:
      "Professional pet daycare & boarding in Chennai. Home-based care from ₹500/day. 25+ years experience. WhatsApp updates daily. Book today!",
  },
  services: {
    title: "Chennai Pet Services | Daycare & Boarding",
    description:
      "Pet daycare & boarding services in Chennai, Tamil Nadu. Starting ₹500/day. Dogs, cats & birds welcome. Contact PS Pet Care Avadi now!",
  },
  about: {
    title: "About PS Pet Care | 25+ Years Chennai Experience",
    description:
      "PS Pet Care: 25+ years Chennai pet care experience. Home-based services in Avadi. Personal attention for every pet. Trusted by families.",
  },
  contact: {
    title: "Contact PS Pet Care Chennai | Book Pet Daycare",
    description:
      "Contact PS Pet Care Chennai for pet daycare & boarding. WhatsApp +91 99622 03484. Located Avadi, Tamil Nadu. Book consultation today!",
  },
  blog: {
    title: "Pet Care Blog - Tips, Advice & News",
    description:
      "Read our latest articles on pet care, training tips, health advice, and local pet events. Expert insights to help you care for your furry friends.",
  },
};

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 600,
      height: 60,
    },
    image: `${siteConfig.url}/og-image.jpg`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.1206892,
      longitude: 80.1013128,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "INR",
    areaServed: {
      "@type": "City",
      name: siteConfig.address.city,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      siteConfig.social.youtube,
    ],
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/storefront.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.1206892,
      longitude: 80.1013128,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
  },
};

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  price: { from: number; unit: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.address.city,
    },
    offers: {
      "@type": "Offer",
      price: service.price.from,
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: service.price.from,
        priceCurrency: "INR",
        unitCode: service.price.unit,
      },
    },
  };
}

export function generateReviewSchema(testimonials: Array<{
  author: string;
  rating: number;
  text: string;
  petType: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonials.length,
      bestRating: "5",
      worstRating: "5"
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: testimonial.author
      },
      reviewBody: testimonial.text,
      datePublished: new Date().toISOString().split('T')[0]
    }))
  };
}

export function generatePetCareServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: siteConfig.name,
    description: "Professional pet daycare and boarding services in Chennai",
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.1206892,
      longitude: 80.1013128,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pet Care Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pet Daycare Services",
            description: "Professional daycare for dogs, cats, and birds"
          },
          price: "500",
          priceCurrency: "INR"
        },
        {
          "@type": "Offer", 
          itemOffered: {
            "@type": "Service",
            name: "Pet Boarding Services",
            description: "Overnight boarding with 24/7 care"
          },
          price: "800",
          priceCurrency: "INR"
        }
      ]
    }
  };
}
