import { useState } from 'react'
import { Terminal, Cpu, Sparkles, Binary } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { skillCategories } from '../data/skills.js'

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id)

  const activeCategory = skillCategories.find((cat) => cat.id === activeTab) || skillCategories[0]

  return (
    <section id="skills" className="section section-wrap skills-section">
      <div className="section-ambient-glow glow-skills" aria-hidden="true" />
      <SectionHeading kicker="TECHNICAL CAPABILITIES" title="The stack behind the engineering." number="05" />

      <div className="section-intro">
        <p>
          Organized by domain expertise without arbitrary proficiency percentages. Prioritizing Python development, machine learning algorithms, and real-world system architecture.
        </p>
        <span className="mono">6 TECHNICAL DOMAINS</span>
      </div>

      <div className="skills-interactive-container">
        {/* Domain Navigation Tabs */}
        <div className="skills-tabs-list" role="tablist">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeTab === category.id}
              className={`skills-tab-btn ${activeTab === category.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              <span className="skills-tab-title">{category.title}</span>
              <span className="skills-tab-sub mono">{category.skills.length} competencies</span>
            </button>
          ))}
        </div>

        {/* Active Domain Panel */}
        <div className="skills-active-panel">
          <Reveal className="panel-header">
            <div className="panel-title-wrap">
              <span className="eyebrow mono"><Sparkles size={13} className="text-violet" /> {activeCategory.subtitle}</span>
              <h3 className="panel-title">{activeCategory.title}</h3>
              <p className="panel-desc">{activeCategory.description}</p>
            </div>
          </Reveal>

          <div className="skills-pills-grid">
            {activeCategory.skills.map((skill, index) => (
              <Reveal
                key={skill.name}
                delay={index * 0.04}
                className={`skill-pill-card ${skill.highlight ? 'is-highlight' : ''}`}
              >
                <div className="skill-pill-top">
                  <span className="skill-dot" />
                  <span className="skill-role mono">{skill.role}</span>
                </div>
                <div className="skill-name">{skill.name}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Grid showing all core capabilities for quick scanning */}
      <div className="skills-all-grid">
        <div className="all-grid-heading">
          <span className="mono"><Terminal size={14} className="inline mr-1 text-violet" /> AT-A-GLANCE REPERTOIRE FOR RECRUITERS</span>
        </div>
        <div className="domains-overview-cards">
          {skillCategories.map((category) => (
            <div key={category.id} className="domain-mini-card">
              <h4 className="domain-mini-title">
                <Cpu size={14} className="text-blue shrink-0" />
                <span>{category.title}</span>
              </h4>
              <div className="domain-tags-wrap">
                {category.skills.map((s) => (
                  <span key={s.name} className={`mini-tag mono ${s.highlight ? 'tag-highlight' : ''}`}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
