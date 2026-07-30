/* ==========================================================
 * PROJECTS.TS — Single source of truth for all project data
 * ----------------------------------------------------------
 * HOW TO ADD A PROJECT (fully static, no CMS):
 *   1. Copy any object below.
 *   2. Give it a unique `slug` and the next `number`.
 *   3. Set `featured: true` to surface it in the homepage showcase.
 *   4. Fill in `links` once the project is deployed (optional).
 * The home showcase, /projects archive, filters, and /projects/[slug]
 * detail pages all read from this array automatically.
 * ========================================================== */
import type { Project } from '@/types'

export const projects: Project[] = [
    {
        slug: 'collusion-graph',
        number: '01',
        title: 'CollusionGraph',
        subtitle: 'Graph Deep Learning for Collusion Detection',
        year: '2026',
        status: 'completed',
        category: 'Graph ML',
        featured: true,
        oneLiner:
            'One graph model that screens money laundering and bid-rigging cartels as the same problem — hidden coordination that only shows in the network.',
        description:
            'CollusionGraph treats two very different crimes — money laundering and bid-rigging cartels — as one underlying problem: coordination between parties that leaves a structural fingerprint in a network. Six public datasets are unified into a single graph schema, scored by four parallel model arms, calibrated and fused, then rolled up by community into a ranked, explained queue for a human investigator — served behind a strict read-only trust boundary with a grounded GenAI copilot.',
        highlights: [
            'Unified graph schema turns six public datasets across two crime domains into one domain-agnostic node/edge representation — a single stack for laundering and bid-rigging alike',
            'Four scoring arms in parallel: supervised GNNs (GATv2 / GraphSAGE / R-GCN with focal loss), unsupervised graph anomaly detection (DOMINANT / GAE), hand-built structural features, and gradient-boosted baselines',
            'On a 488k-node national contract network with no answer key, the unsupervised deep model recovers ~92% of bid-together cartels vs ~12% for a non-learning baseline',
            'Calibrating scores before combining them made the ensemble ~9× stronger — the single highest-value fix, same models and data',
            'Explanation layer: PGExplainer evidence, a 9-pattern FATF/OECD motif matcher, and a read-only GenAI copilot that grounds every number and cannot assert guilt',
        ],
        tech: [
            'PyTorch', 'PyTorch Geometric', 'GATv2', 'GraphSAGE', 'R-GCN',
            'PyGOD', 'scikit-learn', 'XGBoost', 'LightGBM',
            'NetworkX', 'python-igraph', 'Leiden',
            'Polars', 'Pandas', 'PyArrow', 'DuckDB', 'Pydantic',
            'FastAPI', 'Uvicorn',
            'NVIDIA NIM', 'BM25',
            'React', 'TypeScript', 'Vite', 'TailwindCSS', 'Zustand',
            'TanStack Query', 'Sigma.js', 'graphology', 'GSAP', 'Motion',
            'Hydra', 'Weights & Biases',
            'AWS', 'Docker', 'pytest', 'ruff', 'mypy',
        ],
        metrics: [
            { label: 'Cartels Recovered', value: '~92%' },
            { label: 'Graph Edges', value: '1.45M' },
            { label: 'Ensemble Gain', value: '9×' },
        ],
        image: null,
        links: {},
    },
    {
        slug: 'algoviz',
        number: '02',
        title: 'AlgoViz',
        subtitle: 'Real-Time Algorithmic Trading Dashboard',
        year: '2025',
        status: 'completed',
        category: 'AI/ML',
        featured: true,
        oneLiner:
            'Real-time trading intelligence, from raw market data to actionable signals.',
        description:
            'AlgoViz turns a live exchange firehose into clear, explainable trading signals. It streams BTC/USDT order flow, runs a from-scratch deep learning model, and surfaces decisions through an interactive dashboard — all engineered for low latency and reproducibility.',
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
        metrics: [
            { label: 'Throughput', value: '50+/s' },
            { label: 'Latency', value: '<100ms' },
            { label: 'Unit Tests', value: '45' },
        ],
        image: null,
        links: {},
    },
    {
        slug: 'smart-contract-scanner',
        number: '03',
        title: 'Smart Contract Security Scanner',
        subtitle: 'AI Blockchain Vulnerability Analyzer',
        year: '2026',
        status: 'completed',
        category: 'Web3',
        featured: true,
        oneLiner:
            'AI-powered vulnerability analysis for blockchain smart contracts across 6 networks.',
        description:
            'A full-stack security tool that audits Solidity smart contracts with LLM reasoning. It maps vulnerabilities line-by-line, scores contract risk, and proposes automated fixes — built for Dubai\u2019s DIFC Web3 ecosystem.',
        highlights: [
            'Full-stack scanner targeting Dubai\u2019s DIFC Web3 ecosystem with React 18 frontend and FastAPI backend',
            'Google Gemini 2.5 Flash LLM inference for line-level Solidity vulnerability mapping across 10+ categories',
            '0\u2013100 risk scoring engine with automated fix generation across 6 blockchain networks via Alchemy API',
        ],
        tech: [
            'Python', 'FastAPI', 'React 18', 'TypeScript',
            'Gemini 2.5 Flash', 'Docker', 'Alchemy API',
        ],
        metrics: [
            { label: 'Networks', value: '6 chains' },
            { label: 'Vuln Classes', value: '10+' },
            { label: 'Risk Score', value: '0\u2013100' },
        ],
        image: null,
        links: {},
    },
    {
        slug: 'smart-city-traffic',
        number: '04',
        title: 'Smart City Traffic Management',
        subtitle: 'Multi-Agent Reinforcement Learning System',
        year: '2026',
        status: 'completed',
        category: 'Reinforcement Learning',
        featured: true,
        oneLiner:
            'MARL system optimizing adaptive traffic signal control across a 16-intersection Dubai grid.',
        description:
            'A multi-agent reinforcement learning system that coordinates traffic signals across a 16-intersection grid. Decentralized agents learn adaptive policies, a coordination layer handles edge cases, and an explainable dashboard makes every decision auditable.',
        highlights: [
            'Decentralized Q-Learning and SARSA agents trained over 60,000 steps with 6-factor reward functions',
            '3-protocol Coordination Layer with Chaos Mode stress-testing sandstorm conditions and emergency preemption',
            'Real-time React 18 dashboard with live grid animations, Q-value XAI panels, and TOPSIS multi-criteria metrics',
        ],
        tech: [
            'Python', 'React 18', 'Vite', 'NumPy',
            'Pandas', 'TOPSIS',
        ],
        metrics: [
            { label: 'Intersections', value: '16' },
            { label: 'Training Steps', value: '60k' },
            { label: 'Protocols', value: '3' },
        ],
        image: null,
        links: {},
    },
]

/** Projects curated for the homepage horizontal showcase. */
export const featuredProjects = projects.filter((p) => p.featured)

/** Unique category labels, derived for the /projects filter chips. */
export const projectCategories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category))),
]

/** Look up a single project by slug (used by detail pages). */
export const getProjectBySlug = (slug: string): Project | undefined =>
    projects.find((p) => p.slug === slug)
