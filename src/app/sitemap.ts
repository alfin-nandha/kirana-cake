import { MetadataRoute } from 'next'
import products from '@/data/products.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kiranacake.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ]
}
