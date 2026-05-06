import { MetadataRoute } from 'next'
import articles from '@/data/articles.json' 
import { getAllVendorSlugs } from '@/lib/vendors'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sosika.co.tz'
  const vendors = await getAllVendorSlugs();

  // Map through your JSON file to create sitemap entries
  const blogEntries = articles.map((article: any) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    // If your JSON has an 'updatedAt' or 'date' field, use it. 
    // Otherwise, use the current date.
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const vendorEntries = vendors.map((slug: string) => ({
    url: `${baseUrl}/vendors/${slug}`,
    lastModified: new Date(), // You can replace this with actual last modified date if available
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
    // Spread your dynamic entries here
    ...blogEntries,
    ...vendorEntries
  ]
}