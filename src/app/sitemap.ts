import { MetadataRoute } from 'next'
import articles from '@/data/articles.json' // Adjust path based on your folder structure

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sosika.co.tz'

  // Map through your JSON file to create sitemap entries
  const blogEntries = articles.map((article: any) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    // If your JSON has an 'updatedAt' or 'date' field, use it. 
    // Otherwise, use the current date.
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
        url: `${baseUrl}/our-services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: `${baseUrl}/our-partners`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: `${baseUrl}/join-vendor`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: `${baseUrl}/join-rider`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
    },
    // Spread your dynamic blog entries here
    ...blogEntries,
  ]
}