/* ==========================================================
 * OPPORTUNITIES.TS — "Ways To Work Together" card content
 * Edit copy here; the section renders from this array.
 * ========================================================== */
export interface Opportunity {
    number: string
    eyebrow: string
    title: string
    description: string
}

export const opportunities: Opportunity[] = [
    {
        number: '01',
        eyebrow: 'For Recruiters',
        title: 'Applied AI roles with delivery depth',
        description:
            'Built for teams hiring AI engineers and builders who can turn requirements into working systems with strong product execution.',
    },
    {
        number: '02',
        eyebrow: 'For Research Collaboration',
        title: 'Product-facing applied research',
        description:
            'Strong fit for conversations around intelligent systems, multimodal interfaces, and applied experiments that can move beyond papers.',
    },
    {
        number: '03',
        eyebrow: 'For Product Builds',
        title: 'AI tools and product MVPs',
        description:
            'Available for select collaborations involving internal AI workflows, developer-facing tooling, and fast prototype-to-product iterations.',
    },
]
