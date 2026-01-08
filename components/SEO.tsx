import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'AppendLabs | Append Intelligence to Your Infrastructure',
  description = 'Production-grade AI infrastructure and intelligent agents that reduce workload, improve efficiency, and deliver measurable operational value. Secure, deterministic, and cost-optimized AI solutions for businesses.',
  keywords = 'AI infrastructure, AI agents, RAG chatbots, business automation, operational intelligence, AI consulting, custom AI solutions, machine learning, AI development, intelligent automation, enterprise AI, AI integration',
  canonical,
  ogImage = 'https://appendlabs.com/og-image.jpg',
  ogType = 'website',
  structuredData,
  noindex = false
}) => {
  const siteUrl = 'https://appendlabs.com';
  const fullTitle = title.includes('AppendLabs') ? title : `${title} | AppendLabs`;
  const canonicalUrl = canonical || siteUrl;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Primary Meta Tags
    updateMetaTag('title', fullTitle);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Open Graph Tags
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', title, 'property');
    updateMetaTag('og:site_name', 'AppendLabs', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');

    // Twitter Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', title);

    // Structured Data
    if (structuredData) {
      // Remove existing SEO structured data scripts (keep static ones from index.html)
      document.querySelectorAll('script[type="application/ld+json"][data-seo]').forEach(el => el.remove());
      
      // Add new structured data
      const structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      structuredDataScript.setAttribute('data-seo', 'true');
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Add/Update hreflang for current page
    const updateHreflang = (lang: string, href: string) => {
      let hreflangLink = document.querySelector(`link[hreflang="${lang}"][data-seo]`);
      if (!hreflangLink) {
        hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        hreflangLink.setAttribute('data-seo', 'true');
        document.head.appendChild(hreflangLink);
      }
      (hreflangLink as HTMLLinkElement).href = href;
    };

    updateHreflang('en', canonicalUrl);
    updateHreflang('x-default', canonicalUrl);
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, structuredData, noindex, fullTitle]);

  return null;
};

export default SEO;

