# AppendLabs Landing Page

Production-grade AI infrastructure and intelligent automation landing page built with React, TypeScript, and modern web technologies.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations using Framer Motion
- **SEO Optimized**: Comprehensive SEO implementation with dynamic meta tags, structured data, and proper routing
- **AI Chatbot**: Interactive chatbot powered by OpenAI with voice-to-text support
- **Multi-page Support**: Home, Services, Process, About, Contact, Terms, Privacy, and 404 pages
- **Performance Optimized**: Fast loading with Vite, optimized assets, and lazy loading
- **Vercel Ready**: Pre-configured for Vercel deployment with Analytics and Speed Insights

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **UI Components**: Radix UI, Lucide Icons
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Deployment**: Vercel (with Analytics & Speed Insights)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AppendLabsAI/landing.git
   cd landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: Never commit `.env.local` or `.env` files to git. They are already in `.gitignore`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
landing/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HomePage.tsx    # Main landing page
│   ├── NotFound.tsx    # 404 page
│   ├── TermsOfService.tsx
│   ├── PrivacyPolicy.tsx
│   ├── SEO.tsx         # SEO component
│   └── ...
├── lib/                # Utility functions
│   ├── chatbot-api.ts  # OpenAI API integration
│   ├── chatbot-knowledge.ts  # Chatbot knowledge base
│   └── seo-utils.ts    # SEO utilities
├── public/             # Static assets
│   ├── sitemap.xml     # SEO sitemap
│   ├── robots.txt      # SEO robots file
│   ├── humans.txt      # Humans.txt
│   ├── favicon.svg     # Favicon
│   └── ...
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── vite.config.ts      # Vite configuration
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_OPENAI_API_KEY`
4. Deploy!

The project is pre-configured with:
- `vercel.json` for routing and headers
- Vercel Analytics integration
- Vercel Speed Insights integration

## SEO Features

- Dynamic meta tags per page
- Structured data (JSON-LD) for all pages
- Sitemap.xml with all routes
- Robots.txt configuration
- Open Graph and Twitter Card support
- Canonical URLs
- Hreflang tags

## Pages & Routes

- `/` - Homepage
- `/services` - Services section
- `/process` - Process section
- `/about` - About section
- `/contact` - Contact section
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/*` - 404 Not Found

## License

Copyright © AppendLabs. All rights reserved.

## Contact

For questions or support, contact: hello@appendlabs.com
