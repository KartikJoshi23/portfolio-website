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
        slug: 'rimal',
        number: '02',
        title: 'RIMAL',
        subtitle: 'Reinforcement Learning for Desert Solar Cleaning — a Negative Result',
        year: '2026',
        status: 'completed',
        category: 'Reinforcement Learning',
        featured: true,
        oneLiner:
            "An RL benchmark for cleaning a desert solar plant, calibrated to DEWA's own field data — where deep RL lost every hypothesis to a tuned rule, and a Kalman filter cut soiling-estimate error 17.7×.",
        description:
            "RIMAL (رمال, \"sands\") is a reinforcement-learning benchmark for photovoltaic soiling and cleaning dispatch at Dubai's Mohammed bin Rashid Al Maktoum Solar Park. It builds a simulator from ten years of NASA POWER weather and aerosol data, calibrates it to DEWA's published cleaning-robot field trial, reproduces the cleaning-interval optimum from the literature as a falsification gate, and then tests four hypotheses about where a learning agent should beat a well-tuned rule — with PPO, a belief-state PPO, a learned fleet estimator and a distributional QR-DQN. Deep RL did not win any of them. The value was somewhere else: the hard part of PV cleaning is state estimation, not control, and a Kalman filter over the plant's own performance ratio reduced soiling-estimate error 17.7× and made cleaning decisions immune to sensor noise that collapses a naive rule. The project ships with 195 tests and eight acceptance gates declared before each milestone was built, and as a live site that runs the same physics in the browser, including the trained PPO actor's forward pass.",
        highlights: [
            "Simulator calibrated to DEWA's own field trial (soiling 0.14–0.33 %/day, cleaning efficiencies 69–99%) on ten years of measured Dubai weather; specific yield 1,703–1,802 kWh/kWp against the Global Solar Atlas reference of 1,791.5",
            "Falsification gate before any agent was trained: with the admissible cleaning cost fixed in advance, the simulator's optimum lands inside the published 28–34 day band (31 d at $60/MWp per pass, 34 d at $75) — and the optimum is flat: any interval from 16 to 57 days is within 1% of optimal",
            "Four hypotheses, four negative results on held-out years: PPO lost to a tuned threshold by $20/MWp/yr, a belief-state agent added +$29 (p = 0.17), a learned fleet estimator ranked five robots perfectly (Spearman ρ = 1.00) and still lost $103/yr, and QR-DQN lost on CVaR@5% by $501 with a risk dial that produced no ordering",
            "The finding that transfers: under a noisy performance-ratio signal a naive threshold rule collapses 17.2% and cleans ~98 times a year instead of 8; from 3% noise a blind calendar beats it; a Kalman filter holds within $13 across the whole 1–10% noise range",
            "Engineering discipline as the credibility argument: acceptance criteria declared before each milestone, 195 tests, seven defects found in our own work and recorded at the site of each fix, a browser port of the physics verified against the Python engine to 7e-5, zero cost and CPU-only",
        ],
        tech: [
            'Python', 'PyTorch', 'Gymnasium', 'pvlib', 'NumPy', 'pandas',
            'SciPy', 'PyArrow', 'matplotlib', 'pytest',
            'PPO', 'QR-DQN', 'Kalman filter', 'NASA POWER API',
            'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4',
            'three.js', 'react-three-fiber', 'framer-motion', 'GSAP', 'Lenis',
            'D3', 'Puppeteer', 'Vercel',
        ],
        metrics: [
            { label: 'Estimate Error Cut', value: '17.7×' },
            { label: 'Hypotheses Falsified', value: '4 / 4' },
            { label: 'Tests · 8 Gates', value: '195' },
        ],
        image: null,
        links: {},
    },
    {
        slug: 'algoviz',
        number: '03',
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
        number: '04',
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
        number: '05',
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
