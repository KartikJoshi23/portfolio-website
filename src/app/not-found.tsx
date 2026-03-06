/* ==========================================================
 * NOT-FOUND.TSX — Custom 404 Page
 * Branded 404 with violet theme and CTA back to home
 * ========================================================== */
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian px-6 text-center">
            {/* Large 404 */}
            <h1
                className="font-sora font-bold text-cool-white uppercase"
                style={{
                    fontSize: 'clamp(6rem, 20vw, 14rem)',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                404
            </h1>

            <p className="mt-4 font-sora font-medium text-xl md:text-2xl text-cool-white">
                Page not found
            </p>

            <p className="mt-2 font-inter text-silver text-sm md:text-base max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 font-sora font-medium text-[14px] text-cool-white uppercase tracking-[0.05em]
                           px-8 py-4 rounded-full bg-linear-to-br from-violet to-cyan
                           hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-300"
            >
                Back to Home
            </Link>

            {/* Ambient glow */}
            <div
                className="fixed inset-0 pointer-events-none -z-10"
                style={{
                    background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 70%)',
                }}
            />
        </div>
    )
}
