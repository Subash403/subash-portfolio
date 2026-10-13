import { useState, useRef } from 'react'
import { Award, Calendar, ExternalLink, Shield, Hash, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { certifications } from '../data/certifications.js'
import { getProviderLogo } from './CertificationLogos.jsx'

function CertificationCard({ cert, index }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const ProviderLogo = getProviderLogo(cert.issuer, cert.title)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    cardRef.current.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    setCoords({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }
  }

  return (
    <article
      ref={cardRef}
      className={`cert-card cert-${cert.accent}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular spotlight following cursor */}
      {isHovered && (
        <div
          className="cert-spotlight"
          style={{
            background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(161, 132, 255, 0.18), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="cert-card-top">
        <div className="cert-header-row">
          <div className="cert-logo-container" aria-hidden="true">
            <ProviderLogo className="w-10 h-10 cert-provider-icon" />
          </div>
          <div className="cert-meta-tags">
            <span className="cert-category mono">
              <Shield size={11} className="inline mr-1" />
              {cert.category}
            </span>
            {cert.date && (
              <span className="cert-date mono">
                <Calendar size={11} className="inline mr-1 opacity-70" />
                {cert.date}
              </span>
            )}
          </div>
        </div>

        <h3 className="cert-title">{cert.title}</h3>

        {cert.issuer && (
          <div className="cert-issuer mono">
            <span className="issuer-bullet">&bull;</span> {cert.issuer}
          </div>
        )}
      </div>

      <div className="cert-skills-pills">
        {cert.skills.map((skill) => (
          <span key={skill} className="mono cert-skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="cert-card-footer">
        {cert.credentialId && (
          <span className="cert-id-tag mono">
            <Hash size={11} />
            <span>ID: {cert.credentialId}</span>
          </span>
        )}

        {cert.validity && (
          <span className="cert-validity-tag mono">
            {cert.validity}
          </span>
        )}

        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-link-btn"
            aria-label={`View certificate for ${cert.title}`}
          >
            <span>View Credential</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </article>
  )
}

export default function CertificationGallery() {
  return (
    <section id="certifications" className="section section-wrap certifications-section">
      <div className="section-ambient-glow glow-certifications" aria-hidden="true" />
      <SectionHeading
        kicker="CREDENTIALS & KNOWLEDGE"
        title="Certifications & Professional Learning."
        number="06"
      />

      <div className="section-intro">
        <p>
          Specialized industry certifications and accredited technical learning with verified institutional brand credentials across AI/ML engineering, Python systems, and data analytics.
        </p>
        <span className="mono">{certifications.length} CREDENTIALS // AUTHENTIC PROVIDERS</span>
      </div>

      <div className="certs-unified-grid">
        {certifications.map((cert, index) => (
          <Reveal
            key={cert.id}
            delay={(index % 3) * 0.08}
            className="cert-reveal-item"
          >
            <CertificationCard cert={cert} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
