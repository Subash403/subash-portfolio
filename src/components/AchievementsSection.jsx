import { Trophy, Presentation, Sparkles, Award } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { achievements, technicalPresentations } from '../data/achievements.js'

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section section-wrap achievements-section">
      <div className="section-ambient-glow glow-achievements" aria-hidden="true" />
      <SectionHeading
        kicker="HONORS & RECOGNITION"
        title="Competitive victories & technical papers."
        number="07"
      />

      <div className="section-intro">
        <p>
          Competitive hackathons, algorithmic coding challenges, and academic symposium presentations demonstrating technical rigor and problem-solving under evaluation.
        </p>
        <span className="mono">{achievements.length} AWARDS // 3 PAPER PRESENTATIONS</span>
      </div>

      <div className="achievements-grid">
        {achievements.map((item, index) => {
          const isFirstPlace = item.badge === '1ST PLACE'
          return (
            <Reveal
              key={item.title + index}
              delay={(index % 3) * 0.07}
              className={`achievement-card achievement-${item.accent} ${isFirstPlace ? 'achievement-first-place' : ''}`}
            >
              <div className="achievement-header">
                <span className={`achievement-badge mono ${isFirstPlace ? 'badge-gold' : ''}`}>
                  <Trophy size={13} className="inline mr-1" />
                  {item.badge}
                </span>
                <span className="mono text-muted text-xs">{item.category}</span>
              </div>

              <h3 className="achievement-title">{item.title}</h3>
              <div className="achievement-institution mono">{item.institution}</div>
              <p className="achievement-desc">{item.description}</p>
            </Reveal>
          )
        })}
      </div>

      {/* Technical Paper Presentations */}
      <div className="presentations-wrapper">
        <div className="presentations-header">
          <Presentation size={18} className="text-blue" />
          <h3 className="presentations-title">Technical Paper Presentations</h3>
        </div>
        <div className="presentations-grid">
          {technicalPresentations.map((paper, i) => (
            <Reveal key={paper.venue} delay={i * 0.08} className="paper-card">
              <div className="paper-venue mono">
                <span className="status-dot" />
                {paper.venue}
              </div>
              <h4 className="paper-type">{paper.type}</h4>
              <p className="paper-desc">{paper.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
