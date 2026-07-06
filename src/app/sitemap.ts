/* ==========================================================
 * SITEMAP.TS — auto-generated sitemap for SEO
 * Includes home, /projects, and every /projects/[slug] route.
 * ========================================================== */
import { MetadataRoute } from 'next'
import { META } from '@/lib/constants'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    return [
        {
            url: META.siteUrl,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${META.siteUrl}/projects`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...projects.map((p) => ({
            url: `${META.siteUrl}/projects/${p.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ]
}
