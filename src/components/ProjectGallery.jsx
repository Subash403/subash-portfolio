import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/projects.js'

const filterCategories = [
  'ALL PROJECTS',
  'WEB APPLICATION',
  'HEALTHCARE AI',
  'COMPUTER VISION',
]

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState('ALL PROJECTS')

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL PROJECTS') return true
    if (activeFilter === 'WEB APPLICATION') return project.category.includes('BUSINESS') || project.category.includes('WEB')
    if (activeFilter === 'HEALTHCARE AI') return project.category.includes('HEALTHCARE') || project.category.includes('AI')
    if (activeFilter === 'COMPUTER VISION') return project.category.includes('VISION')
    return true
  })

  return (
    <section id="work" className="section section-wrap work-section">
      <div className="section-ambient-glow glow-projects" aria-hidden="true" />
      <SectionHeading kicker="ENGINEERING REPERTOIRE" title="Selected projects & systems." number="03" />

      <div className="section-intro">
        <p>
          Real client software, applied machine-learning systems, and computer vision perception pipelines. Each project represents verified technical implementation without fabricated claims.
        </p>
        <span className="mono">{projects.length} PROJECTS // EDITABLE IN DATA FILE</span>
      </div>

      <div className="project-filter-bar">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-pill mono ${activeFilter === cat ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
