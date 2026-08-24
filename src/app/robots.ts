import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'], 
    },
    sitemap: 'https://kimkerans.my.id/sitemap.xml',
  };
}