import { ArrowUpRight, BrainCircuit, Code2, Eye, Layers } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const pillars = [
  {
    icon: BrainCircuit,
    index: '01',
    title: 'Machine Learning & Deep Learning',
    description: 'Practical predictive modeling, regression, classification, neural network exploration, and hyperparameter tuning grounded in real and synthetic datasets.',
  },
  {
    icon: Code2,
    index: '02',
    title: 'Python Engineering & Architecture',
    description: 'Clean, modular backend development, data manipulation with Pandas & NumPy, database schemas, and structured error diagnostics.',
  },
  {
    icon: Eye,
    index: '03',
    title: 'Computer Vision & Real-Time AI',
    description: 'Object detection pipelines utilizing YOLOv8 and OpenCV for low-latency visual inference, target localization, and situational awareness.',
  },
  {
    icon: Layers,
    index: '04',
    title: 'Full-Stack Delivery & Client Systems',
    description: 'Translating client requirements into production software, complete with Next.js frontends, Supabase backends, and automated deployments.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="section section-wrap about-section">
      <div className="section-ambient-glow glow-about" aria-hidden="true" />
      <div className="section-tech-lines" aria-hidden="true" />
      <SectionHeading kicker="PROFESSIONAL PROFILE" title="Curiosity into capability." number="01" />

      <div className="about-grid">
        <Reveal className="about-statement">
          <p className="large-copy">
            I work at the convergence of <span className="text-violet">applied machine learning</span>,{' '}
            <span className="text-blue">Python systems</span>, and <span className="text-white">real-world software delivery</span>.
          </p>
          <div className="about-stats-grid">
            <div className="about-stat-card">
              <span className="stat-number gradient-text">2026</span>
              <span className="stat-label">B.Tech AI & Data Science</span>
              <span className="stat-sub">Degree Status</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-number text-violet">15+</span>
              <span className="stat-label">Freelance Projects</span>
              <span className="stat-sub">Paid Client Delivery</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-number text-blue">2</span>
              <span className="stat-label">Production Websites</span>
              <span className="stat-sub">Including SHEE'S SPA</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-number gradient-text">100+</span>
              <span className="stat-label">Dev Issues Solved</span>
              <span className="stat-sub">Nitroware ML Internship</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-detail" delay={0.12}>
          <div className="about-narrative">
            <p>
              I'm a B.Tech Artificial Intelligence and Data Science graduate focused on Python development, machine learning, and building practical software applications. Through freelance development and internship experience, I've worked on AI/ML workflows, computer vision, data analytics, and full-stack applications.
            </p>
            <p>
              I enjoy translating requirements into working solutions, troubleshooting technical issues, and delivering software that addresses real needs — from designing automated booking infrastructure for business clients to training predictive machine-learning models.
            </p>
            <div className="about-actions">
              <a className="text-link" href="#experience">
                <span>View professional timeline</span>
                <ArrowUpRight size={15} />
              </a>
              <a className="text-link" href="#work">
                <span>Explore featured projects</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="pillars-grid">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon
          return (
            <Reveal key={pillar.index} delay={i * 0.08} className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-icon"><Icon size={20} /></span>
                <span className="pillar-index mono">{pillar.index}</span>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
