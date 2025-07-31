# 🐾 Ps Pet Care - Premium Pet Daycare Website

A high-performance, SEO-optimized static website for Ps Pet Care, built with modern web technologies and designed to convert visitors into customers.

![Ps Pet Care](https://img.shields.io/badge/Status-Production%20Ready-green)
![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)

## 🚀 Features

### Core Features

- ✅ **Modern Tech Stack**: Astro + React + TypeScript + Tailwind CSS
- ✅ **Pet-Themed Animations**: Custom pet loader, smooth transitions, and micro-interactions
- ✅ **Responsive Design**: Mobile-first approach with seamless experience across all devices
- ✅ **SEO Optimized**: Meta tags, structured data, sitemap, and local business schema
- ✅ **Performance**: 90+ Lighthouse scores with optimized images and lazy loading
- ✅ **Dark Mode**: Automatic theme switching based on user preference

### Business Features

- 📞 **Sticky CTAs**: "Call Us Now" header button and WhatsApp floating action button
- 📝 **Smart Forms**: Pet-themed contact and multi-step booking forms with validations
- 📸 **Interactive Gallery**: Filterable pet photos with lightbox
- 💬 **Testimonials**: Auto-playing carousel with customer reviews
- 📰 **Blog System**: SEO-optimized content management for pet care articles
- 🗺️ **Location Info**: Contact details, hours, and map integration ready

### Pages Included

- **Homepage**: Hero, services, testimonials, gallery, FAQ, and CTAs
- **Services**: Detailed service offerings with pricing
- **About Us**: Company story, team profiles, and facility information
- **Contact**: Contact forms, booking system, location, and hours
- **Blog**: Article listing with categories and search
- **404**: Custom pet-themed error page

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ps-pet-care
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
ps-pet-care/
├── src/
│   ├── components/      # React components
│   ├── layouts/         # Astro layouts
│   ├── pages/           # Route pages
│   ├── content/         # Blog content
│   ├── styles/          # Global styles
│   ├── config/          # Configuration files
│   └── utils/           # Utility functions
├── public/              # Static assets
└── dist/                # Production build
```

## 🎨 Customization

### Theme Configuration

Edit `src/config/theme.ts` to customize:

- Brand colors
- Typography
- Spacing
- Animation settings

### Content Updates

- **Site Info**: Update `siteConfig` in `src/config/theme.ts`
- **Services**: Modify `SERVICES` in `src/config/constants.ts`
- **Team**: Update `TEAM_MEMBERS` in `src/config/constants.ts`
- **FAQs**: Edit `FAQ_ITEMS` in `src/config/constants.ts`

### Adding Blog Posts

Create new `.md` files in `src/content/blog/` with the required frontmatter:

```yaml
---
title: "Your Post Title"
description: "Post description"
pubDate: 2024-03-20
category: "pet-care-tips"
tags: ["tag1", "tag2"]
---
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Deployment

1. Run `npm run build`
2. Upload `dist` folder to your hosting provider

## 🔧 Environment Variables

Create a `.env` file for local development:

```env
PUBLIC_SITE_URL=https://pspetcare.com
PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 📱 Key Features Implementation

### Pet Loader Animation

- Location: `src/components/animations/PetLoader.tsx`
- Displays on initial page load with progress indicator

### WhatsApp Integration

- Location: `src/components/common/FloatingWhatsApp.tsx`
- Pre-filled message template
- Pulse animation to attract attention

### Form Validations

- Pet-themed error messages
- Real-time validation
- Multi-step booking process

### SEO Features

- Dynamic meta tags per page
- Local business schema markup
- XML sitemap generation
- Open Graph tags

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🧪 Testing

Run development server and verify:

- [ ] All pages load correctly
- [ ] Forms submit properly
- [ ] Animations work smoothly
- [ ] Mobile responsive design
- [ ] Dark mode toggles correctly
- [ ] SEO meta tags are present

## 📈 Performance

Target metrics:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is proprietary to Ps Pet Care. All rights reserved.

## 🆘 Support

For support or questions:

- Email: hello@pspetcare.com
- Phone: +1 (555) 123-4567
- WhatsApp: +15551234567

---

Built with ❤️ for pets and their humans
