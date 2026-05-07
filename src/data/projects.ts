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
            'Dockerized deployment, 45 unit tests, led a 3-member team',
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
        year: '2026',
        status: 'completed',
        oneLiner:
            'AI-powered vulnerability analysis for blockchain smart contracts across 6 networks.',
        highlights: [
            'Full-stack scanner targeting Dubai\'s DIFC Web3 ecosystem with React 18 frontend and FastAPI backend',
            'Google Gemini 2.5 Flash LLM inference for line-level Solidity vulnerability mapping across 10+ categories',
            '0–100 risk scoring engine with automated fix generation across 6 blockchain networks via Alchemy API',
        ],
        tech: [
            'Python', 'FastAPI', 'React 18', 'TypeScript',
            'Gemini 2.5 Flash', 'Docker', 'Alchemy API',
        ],
        image: null,
    },
    {
        number: '03',
        title: 'Smart City Traffic Management',
        subtitle: 'Multi-Agent Reinforcement Learning System',
        year: '2026',
        status: 'completed',
        oneLiner:
            'MARL system optimizing adaptive traffic signal control across a 16-intersection Dubai grid.',
        highlights: [
            'Decentralized Q-Learning and SARSA agents trained over 60,000 steps with 6-factor reward functions',
            '3-protocol Coordination Layer with Chaos Mode stress-testing sandstorm conditions and emergency preemption',
            'Real-time React 18 dashboard with live grid animations, Q-value XAI panels, and TOPSIS multi-criteria metrics',
        ],
        tech: [
            'Python', 'React 18', 'Vite', 'NumPy',
            'Pandas', 'TOPSIS',
        ],
        image: null,
    },
    {
        number: '04',
        title: 'Sentinel-Gate',
        subtitle: 'Gated Adaptive Biometric Authentication System',
        year: '2025',
        status: 'in-progress',
        oneLiner:
            'Multi-modal biometric authentication fusing NFC behavior with hand geometry on edge hardware.',
        highlights: [
            'Custom Gated Fusion Network merging 8 behavioral NFC features with 232 hand geometry landmarks via MediaPipe',
            'BiLSTM + Self-Attention encoder achieving sub-100ms inference on CPU-only edge hardware',
            'Deployed on Arduino Nano for resource-constrained embedded devices',
        ],
        tech: [
            'Python', 'PyTorch', 'OpenCV', 'MediaPipe',
            'Arduino Nano', 'scikit-learn',
        ],
        image: null,
    },
]
