/* ==========================================================
 * LOGOMARK.TSX — the "KJ" monogram, in the site's own language
 * Inline SVG (no background box, no PNG matte): the letters
 * are drawn as gradient signal strokes, their junctions marked
 * by softly pulsing network nodes, and a faint dashed link
 * connects K to J — two nodes in the same network.
 * ========================================================== */

interface LogoMarkProps {
    className?: string
}

export default function LogoMark({ className = 'h-9 w-auto' }: LogoMarkProps) {
    return (
        <svg
            viewBox="0 0 50 40"
            className={className}
            role="img"
            aria-label="Kartik Joshi"
            fill="none"
        >
            <defs>
                <linearGradient id="kj-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="55%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
            </defs>

            {/* K — stem + arms */}
            <path
                d="M9 7 V33"
                stroke="url(#kj-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
            />
            <path
                d="M9 21 L21 7"
                stroke="url(#kj-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
            />
            <path
                d="M9 21 L21 33"
                stroke="url(#kj-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
            />

            {/* J — stem + hook */}
            <path
                d="M37 7 V24.5 Q37 32.5 29.5 31.5"
                stroke="url(#kj-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
            />

            {/* the link between the two letters — same network */}
            <path
                d="M21 33 L29.5 31.5"
                stroke="url(#kj-grad)"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.45"
            />

            {/* junction nodes — the particle field, miniaturized */}
            <circle className="logo-node" cx="21" cy="7" r="2" fill="#06B6D4" />
            <circle className="logo-node logo-node-2" cx="9" cy="21" r="2" fill="#7C3AED" />
            <circle className="logo-node logo-node-3" cx="37" cy="7" r="2" fill="#B794F6" />
        </svg>
    )
}
