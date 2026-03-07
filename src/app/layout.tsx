/* ==========================================================
 * LAYOUT.TSX — Blueprint Section 3.2 (Root Layout)
 * Fonts: Section 2.3 / Font Loading: Section 2.3.2
 * Metadata: Section 8.1
 * Providers: SmoothScroll (Section 3.4.5), Analytics (Section 12.4)
 * ========================================================== */
import type { Metadata } from 'next'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SmoothScroll from '@/components/layout/SmoothScroll'
import './globals.css'

/* --- Font Loading (Blueprint Section 2.3.2) --- */
const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-sora-var',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter-var',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono-var',
})

/* --- Metadata (Blueprint Section 8.1) ---
 * Meta title uses TAGLINE, NOT generic job titles.
 * "Kartik Joshi — Automating Intelligence. Decentralizing Trust."
 */
export const metadata: Metadata = {
  title: 'Kartik Joshi — Automating Intelligence. Decentralizing Trust.',
  description:
    'AI/ML specialist building production-grade intelligent systems. Published researcher, hackathon competitor. Masters in AI with Business at SP Jain, Dubai.',
  keywords: [
    'Kartik Joshi', 'AI', 'Machine Learning', 'Portfolio',
    'Dubai', 'SP Jain', 'Computer Vision', 'Python', 'React',
  ],
  authors: [{ name: 'Kartik Joshi' }],
  creator: 'Kartik Joshi',
  metadataBase: new URL('https://your-project.vercel.app'),
  // TODO: Update og-image.png to use the new KJ gradient logo
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-project.vercel.app',
    title: 'Kartik Joshi — Automating Intelligence. Decentralizing Trust.',
    description:
      'AI/ML specialist building production-grade intelligent systems. Explore projects, research, and experience.',
    siteName: 'Kartik Joshi Portfolio',
  },
  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png',
  },
  twitter: {
    card: 'summary',
    title: 'Kartik Joshi — Automating Intelligence. Decentralizing Trust.',
    description:
      'AI/ML specialist building production-grade intelligent systems.',
  },
}

/* --- JSON-LD Structured Data (Blueprint Section 8.1.2) --- */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kartik Joshi',
  url: 'https://your-project.vercel.app',
  description: 'AI/ML specialist, published researcher',
  email: 'kartik.as25dxb025@spjain.org',
  telephone: '+971565582009',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'UAE',
  },
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'SP Jain School of Global Management' },
    { '@type': 'EducationalOrganization', name: 'Parul University' },
  ],
  sameAs: [
    'https://linkedin.com/in/kartikjoshi23',
    'https://github.com/KartikJoshi23',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Favicon — Logo.png (temporary; generate proper 16x16 and 32x32 .ico versions later)
           Next.js metadata.icons handles the favicon via /Logo.png */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7C3AED" />

        {/* Blueprint Section 8.1.2 — JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter antialiased">
        {/* Blueprint Section 8.3 — Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-violet focus:text-cool-white focus:rounded-lg focus:font-sora focus:text-sm"
        >
          Skip to content
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Blueprint Section 12.4 — Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
