/* ==========================================================
 * ACHIEVEMENTS.TS — Blueprint Section 5.6.1
 * Achievement cards and publication data
 * ========================================================== */
import type { Achievement, Publication } from '@/types'

export const achievements: Achievement[] = [
    {
        icon: 'globe',
        title: 'Global Top 10',
        event: 'ICC NIUM Hackathon',
        detail: 'Web3 & Blockchain',
        scope: 'International',
    },
    {
        icon: 'trophy',
        title: 'National Finalist',
        event: 'Smart India Hackathon 2023',
        detail: 'Government Problem Statement',
        scope: 'National',
    },
    {
        icon: 'award',
        title: 'Winner',
        event: "Let's Hack India Tour",
        detail: 'Parul University',
        scope: 'Regional',
    },
    {
        icon: 'shield',
        title: 'Top 8 + Incubation Offer',
        event: 'Vadodara Police Hackathon',
        detail: 'Incubation by PIERC',
        scope: 'Regional',
    },
    {
        icon: 'scroll-text',
        title: 'Certificate of Appreciation',
        event: 'Vadodara Rural Police',
        detail: 'From IPS Rohan Anand for AI prototype demo',
        scope: 'Government',
    },
]

export const publication: Publication = {
    title: 'AI Cloud Service Recommendation System (Eva)',
    journal: 'IJANA Journal, ASICS Conference',
    year: '2024',
    description:
        'Co-authored ML-based cloud service recommendation model achieving 70%+ accuracy on custom 1,000+ data point dataset across 6 user-defined parameters.',
    link: null, // To be provided by Kartik
}
