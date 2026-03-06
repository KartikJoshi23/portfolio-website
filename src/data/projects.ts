/* ==========================================================
 * PROJECTS.TS — Blueprint Section 5.4.2
 * Selected Work project data
 * NO GitHub links on individual project cards (Section 5.4.2)
 * ========================================================== */
import type { Project } from '@/types'

export const projects: Project[] = [
    {
        number: '01',
        title: 'AlgoViz',
        subtitle: 'Real-Time Algorithmic Trading Dashboard',
        year: '2025',
        status: 'completed',
        oneLiner:
            'Real-time trading intelligence, from raw market data to actionable signals.',
        highlights: [
            'Streams live BTC/USDT data via Binance WebSocket — 50+ trades/sec, sub-100ms latency',
            'Custom LSTM-Attention model built from scratch in NumPy (no TensorFlow/PyTorch dependency)',
            '9+ real-time features, 10-rule decision engine, 7-component ensemble predictor with backtesting',
            '13,000+ lines of production code, 45 unit tests, Dockerized deployment, led a 3-member team',
        ],
        tech: [
            'Python', 'Streamlit', 'Plotly', 'NumPy', 'SciPy',
            'scikit-learn', 'Docker', 'Binance WebSocket API',
        ],
        image: null,
    },
    {
        number: '02',
        title: 'Smart Contract Security Scanner',
        subtitle: 'AI Blockchain Vulnerability Analyzer',
        year: '2025',
        status: 'in-progress',
        oneLiner:
            'AI-powered vulnerability analysis for blockchain smart contracts across 6 networks.',
        highlights: [
            'Full-stack AI tool generating 0-100 risk scores with severity breakdowns and line-level vulnerability mapping',
            'Google Gemini 2.5 Flash integration detecting reentrancy, overflow, and access control vulnerabilities',
            'Contract fetching across Ethereum, Polygon, BSC, Arbitrum, Optimism, and Base via Alchemy API',
            'React + TypeScript frontend with Monaco Editor, analysis history, stats dashboard, and AI chatbot',
        ],
        tech: [
            'Python', 'FastAPI', 'React 18', 'TypeScript',
            'Google Gemini', 'SQLAlchemy', 'Docker', 'Alchemy API',
        ],
        image: null,
    },
    {
        number: '03',
        title: 'Sentinel-Gate',
        subtitle: 'Gated Adaptive Biometric Authentication System',
        year: '2025',
        status: 'in-progress',
        oneLiner:
            'Multi-modal biometric authentication fusing NFC behavior with hand geometry on $8 hardware.',
        highlights: [
            'Adaptive Gated Fusion Network merging 8 behavioral NFC features with 232 physiological hand features via MediaPipe',
            'Deep SVDD one-class learning for identity verification from only 15 enrollment taps with two-phase training',
            'BiLSTM + Self-Attention tap encoder achieving sub-100ms CPU inference on Arduino Nano + MFRC522',
            'AI explainability dashboard with PCA/t-SNE embeddings, attention heatmaps, and personality-driven voice feedback',
        ],
        tech: [
            'Python', 'PyTorch', 'OpenCV', 'MediaPipe',
            'Arduino', 'Tkinter', 'NumPy', 'scikit-learn',
        ],
        image: null,
    },
]
