import type { EducationItem } from '@/types'

export const education: EducationItem[] = [
    {
        degree: 'Masters in AI with Business',
        institution: 'SP Jain School of Global Management',
        location: 'Dubai, UAE',
        period: '2025 - 2027',
        status: 'current',
        cgpa: '3.6 / 4.0',
        coursework: [
            'Machine Learning',
            'Deep Learning',
            'Neural Networks',
            'Natural Language Processing',
            'Optimization',
            'Operations Management',
        ],
    },
    {
        degree: 'B.Tech in Computer Science & Engineering (AI)',
        institution: 'Parul University',
        location: 'Vadodara, India',
        period: '2020 - 2024',
        status: 'completed',
        cgpa: '8.04 / 10',
        highlight:
            'University Representative, National Entrepreneurship Challenge, IIT Bombay',
    },
]
