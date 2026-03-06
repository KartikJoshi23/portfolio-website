/* ==========================================================
 * BACKGROUNDORBS.TSX — Blueprint v4.0 Change 7b
 * Three static, blurred gradient blobs for background depth
 * Pure CSS, position: fixed, pointer-events: none, z-index: 0
 * ========================================================== */

export default function BackgroundOrbs() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {/* Orb 1 — behind hero area */}
            <div
                className="absolute"
                style={{
                    width: 600,
                    height: 600,
                    top: '10%',
                    left: '20%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                }}
            />

            {/* Orb 2 — behind projects area */}
            <div
                className="absolute"
                style={{
                    width: 500,
                    height: 500,
                    top: '40%',
                    right: '10%',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
                    filter: 'blur(120px)',
                    borderRadius: '50%',
                }}
            />

            {/* Orb 3 — behind contact area */}
            <div
                className="absolute"
                style={{
                    width: 400,
                    height: 400,
                    bottom: '15%',
                    left: '30%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                }}
            />
        </div>
    )
}
