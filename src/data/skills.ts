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
            { name: 'Matplotlib', icon: null },
            { name: 'Plotly', icon: 'plotly' },
            { name: 'Streamlit', icon: 'streamlit' },
        ],
    },
    {
        category: 'Web & DevOps',
        skills: [
            { name: 'React', icon: 'react' },
            { name: 'Next.js', icon: 'nextdotjs' },
            { name: 'FastAPI', icon: 'fastapi' },
            { name: 'SQLAlchemy', icon: null },
            { name: 'Docker', icon: 'docker' },
            { name: 'Git', icon: 'git' },
            { name: 'GitHub Actions', icon: 'githubactions' },
        ],
    },
    {
        category: 'Domains',
        skills: [
            { name: 'Computer Vision', icon: null },
            { name: 'Real-Time Systems', icon: null },
            { name: 'Generative AI', icon: null },
            { name: 'LLM Integration', icon: null },
            { name: 'Blockchain/Web3', icon: null },
            { name: 'Biometric Systems', icon: null },
            { name: 'Prompt Engineering', icon: null },
            { name: 'Data Analytics', icon: null },
        ],
    },
    {
        category: 'Tools',
        skills: [
            { name: 'Cursor', icon: null },
            { name: 'GitHub Copilot', icon: 'githubcopilot' },
            { name: 'Claude', icon: 'anthropic' },
            { name: 'Jupyter', icon: 'jupyter' },
            { name: 'VS Code', icon: 'visualstudiocode' },
        ],
    },
]
