import { MetadataRoute } from 'next'
import products from '@/data/products.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kiranacake.com'

    const productEntries = products.map((product) => ({
        url: `${baseUrl}/products`, // Currently no dynamic individual product pages, so pointing to products list
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

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
        ...productEntries,
    ]
}
