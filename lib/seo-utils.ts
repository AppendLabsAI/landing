// SEO utility functions for generating structured data

export const getOrganizationStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AppendLabs',
  url: 'https://appendlabs.com',
  logo: 'https://appendlabs.com/logo.png',
  description: 'AppendLabs builds secure, deterministic, and cost-optimized AI infrastructure that reduces workload and delivers measurable operational value.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'hello@appendlabs.com',
    areaServed: 'Worldwide',
    availableLanguage: 'English'
  },
  sameAs: [],
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    }
  },
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide'
  }
});

export const getBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

