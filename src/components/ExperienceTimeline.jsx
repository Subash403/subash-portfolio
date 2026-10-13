import { useEffect, useRef } from 'react'
import { Briefcase, Calendar, CheckCircle2, Building2, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './SectionHeading.jsx'
import { experiences } from '../data/experience.js'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceTimeline() {
  const sectionRef = useRef(null)
  const lineFillRef = useRef(null)
  const pulseRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.timeline-milestone-card', { opacity: 1, y: 0 })
        gsap.set(lineFillRef.current, { height: '100%' })
        return
      }

      // Scroll-driven line illumination fill
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        )
      }

      // Traveling light pulse down the timeline
      if (pulseRef.current) {
        gsap.fromTo(
          pulseRef.current,
          { top: '0%', opacity: 0 },
          {
            top: '100%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        )
      }

      // Reveal milestone cards and nodes
      const items = gsap.utils.toArray('.timeline-milestone-item')
      items.forEach((item, index) => {
        const card = item.querySelector('.timeline-milestone-card')
        const marker = item.querySelector('.timeline-marker-outer')
        const isEven = index % 2 === 0

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 45,
            x: isEven ? -25 : 25,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )

        if (marker) {
          gsap.fromTo(
            marker,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.15,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section section-wrap experience-section">
      <div className="section-ambient-glow glow-experience" aria-hidden="true" />
      <SectionHeading kicker="CAREER & INTERNSHIPS" title="Practical delivery & experience." number="02" />

      <div className="section-intro">
        <p>
          A continuous trajectory of independent client delivery, applied machine-learning experimentation, and clean Python backend engineering.
        </p>
        <span className="mono">03 MILESTONES // CHRONOLOGICAL TIMELINE</span>
      </div>

      <div className="timeline-vertical-wrapper">
        {/* Central glowing timeline spine */}
        <div className="timeline-spine" aria-hidden="true">
          <div className="timeline-spine-track" />
          <div ref={lineFillRef} className="timeline-spine-fill" />
          <div ref={pulseRef} className="timeline-spine-pulse" />
        </div>

        <div className="timeline-milestones-list">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={exp.role}
                className={`timeline-milestone-item ${isEven ? 'item-left' : 'item-right'} item-${exp.accent}`}
              >
                {/* Central marker node on the vertical line */}
                <div className="timeline-marker-wrap">
                  <div className="timeline-marker-outer">
                    <div className="timeline-marker-pulse" />
                    <div className="timeline-marker-core">
                      <span className="mono marker-num">0{index + 1}</span>
                    </div>
                  </div>
                  <div className="timeline-connector-stem" />
                </div>

                {/* Milestone Content Card */}
                <div className="timeline-milestone-card">
                  <div className="milestone-top">
                    <div className="milestone-badge-row">
                      <span className="timeline-badge mono">{exp.badge}</span>
                      <span className="timeline-period mono">
                        <Calendar size={12} className="inline mr-1 text-violet" />
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="timeline-title">{exp.role}</h3>

                    <div className="timeline-org">
                      <Building2 size={14} className="text-blue" />
                      <span>{exp.organization}</span>
                    </div>
                  </div>

                  <p className="timeline-tagline">{exp.tagline}</p>

                  <div className="timeline-accomplishments">
                    <h4 className="accomplishments-heading mono">
                      <Sparkles size={12} className="inline mr-1.5 text-violet" />
                      Key Accomplishments & Scope:
                    </h4>
                    <ul className="accomplishments-list">
                      {exp.accomplishments.map((item, i) => (
                        <li key={i}>
                          <CheckCircle2 size={14} className="timeline-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="timeline-skills">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="timeline-skill-pill mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
