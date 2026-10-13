import { useState, useRef } from 'react'
import { ArrowUpRight, Github, ExternalLink, ChevronDown, CheckCircle, Sparkles, Layers, Cpu, Target } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    setSpotlight({ x, y, active: true })
  }

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, active: false }))
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }
  }

  return (
    <article
      ref={cardRef}
      className={`project-card project-${project.accent}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Spotlight */}
      {spotlight.active && (
        <div
          className="project-card-spotlight"
          style={{
            background: `radial-gradient(circle 240px at ${spotlight.x}px ${spotlight.y}px, rgba(168, 85, 247, 0.18), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Project Visual Showcase */}
      <div className="project-visual">
        {project.image ? (
          <div className="project-image-wrap">
            <img
              src={project.image}
              alt={`${project.title} screenshot preview`}
              className="project-screenshot-img"
              loading="lazy"
            />
            <div className="project-image-gradient-overlay" />
          </div>
        ) : (
          <>
            <div className="visual-grid" />
            <div className="visual-glow-mesh" />
          </>
        )}

        <div className="project-visual-badges">
          <span className="visual-index mono">CASE STUDY // {project.number}</span>
          <span className="visual-status mono">{project.status}</span>
          {project.badge && (
            <span className="visual-tag mono">{project.badge}</span>
          )}
        </div>
      </div>

      <div className="project-copy">
        <div className="project-meta">
          <span className="mono project-cat-tag">{project.category}</span>
          <span className="mono project-order-tag">0{index + 1} / 04</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="tag-list">
          {project.stack.map((item) => (
            <span key={item} className="mono project-tag-pill">{item}</span>
          ))}
        </div>

        {/* Expandable Technical Case Study Drawer */}
        <div className={`project-accordion ${isOpen ? 'is-expanded' : ''}`}>
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span>{isOpen ? 'Close Detailed Case Study' : 'Explore Technical Case Study'}</span>
            <ChevronDown size={15} className={`chevron-icon ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="accordion-content">
              {/* Problem Statement */}
              <div className="case-study-block">
                <h4 className="case-study-heading">
                  <Target size={14} className="text-violet shrink-0" />
                  <span>Problem & Requirements</span>
                </h4>
                <p>{project.problem}</p>
              </div>

              {/* Solution & Architecture */}
              {project.architecture && (
                <div className="case-study-block">
                  <h4 className="case-study-heading">
                    <Layers size={14} className="text-blue shrink-0" />
                    <span>System Architecture</span>
                  </h4>
                  <p>{project.architecture}</p>
                </div>
              )}

              {/* Engineering Implementation */}
              <div className="case-study-block">
                <h4 className="case-study-heading">
                  <Cpu size={14} className="text-violet shrink-0" />
                  <span>Engineering Implementation</span>
                </h4>
                <p>{project.implementation}</p>
              </div>

              {/* Verified Measurable Results */}
              {project.results && (
                <div className="case-study-block results-block">
                  <h4 className="case-study-heading">
                    <Sparkles size={14} className="text-blue shrink-0" />
                    <span>Actual Deliverables & Results</span>
                  </h4>
                  <p className="results-text">{project.results}</p>
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="case-study-block">
                  <h4 className="case-study-heading">Key Technical Capabilities</h4>
                  <ul className="features-list">
                    {project.features.map((feat, i) => (
                      <li key={i}>
                        <CheckCircle size={13} className="text-violet shrink-0 mt-1" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="project-actions">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary project-btn"
            >
              <span>Visit Live Website</span>
              <ExternalLink size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-quiet project-btn"
            >
              <Github size={15} />
              <span>GitHub Repo</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}