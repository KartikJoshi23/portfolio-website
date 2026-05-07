/* ==========================================================
 * SKILLS.TS — Blueprint Section 5.5.2
 * Skill categories for the Arsenal ticker section
 * ========================================================== */
import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
    {
        category: 'Languages',
        skills: [
            { name: 'Python', icon: 'python' },
            { name: 'JavaScript', icon: 'javascript' },
            { name: 'TypeScript', icon: 'typescript' },
            { name: 'C/C++', icon: 'cplusplus' },
            { name: 'SQL', icon: 'postgresql' },
            { name: 'HTML/CSS', icon: 'html5' },
        ],
    },
    {
        category: 'AI & Machine Learning',
        skills: [
            { name: 'PyTorch', icon: 'pytorch' },
            { name: 'TensorFlow', icon: 'tensorflow' },
            { name: 'scikit-learn', icon: 'scikitlearn' },
            { name: 'OpenCV', icon: 'opencv' },
            { name: 'MediaPipe', icon: null },
            { name: 'NumPy', icon: 'numpy' },
            { name: 'Pandas', icon: 'pandas' },
            { name: 'SciPy', icon: 'scipy' },
            { name: 'Reinforcement Learning', icon: null },
            { name: 'LSTM & Attention', icon: null },
            { name: 'Deep SVDD', icon: null },
            { name: 'Explainable AI (XAI)', icon: null },
        ],
    },
    {
        category: 'LLM & Generative AI',
        skills: [
            { name: 'Google Gemini API', icon: null },
            { name: 'LLM Inference Pipelines', icon: null },
            { name: 'Prompt Engineering', icon: null },
            { name: 'Responsible AI', icon: null },
            { name: 'AI Chatbot Development', icon: null },
        ],
    },
    {
        category: 'Web & DevOps',
        skills: [
            { name: 'React', icon: 'react' },
            { name: 'Vite', icon: null },
            { name: 'FastAPI', icon: 'fastapi' },
            { name: 'SQLAlchemy', icon: null },
            { name: 'Docker', icon: 'docker' },
            { name: 'Git', icon: 'git' },
            { name: 'GitHub Actions', icon: 'githubactions' },
            { name: 'REST APIs', icon: null },
            { name: 'Jupyter Notebooks', icon: 'jupyter' },
        ],
    },
    {
        category: 'Developer Tools',
        skills: [
            { name: 'Cursor', icon: null },
            { name: 'GitHub Copilot', icon: 'githubcopilot' },
            { name: 'Claude (Anthropic)', icon: 'anthropic' },
            { name: 'Git/GitHub', icon: 'github' },
        ],
    },
    {
        category: 'Domains',
        skills: [
            { name: 'Real-Time Systems', icon: null },
            { name: 'Edge Deployment', icon: null },
            { name: 'MLOps', icon: null },
            { name: 'Biometric Authentication', icon: null },
            { name: 'Web3 & Blockchain', icon: null },
            { name: 'Smart City Systems', icon: null },
            { name: 'Data Analytics', icon: null },
        ],
    },
]
