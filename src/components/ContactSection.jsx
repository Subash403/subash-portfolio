import { useState } from 'react'
import { Mail, Linkedin, Github, Download, Copy, Check, Sparkles, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const email = 'subashrcm61@gmail.com'

  const copyEmail = () => {
    navigator.clipboard?.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" className="contact-section section-wrap">
      {/* Cinematic Orbital Ambient Fields */}
      <div className="contact-orb contact-orb-violet" aria-hidden="true" />
      <div className="contact-orb contact-orb-blue" aria-hidden="true" />
      <div className="contact-orbital-rings" aria-hidden="true">
        <div className="contact-ring ring-1" />
        <div className="contact-ring ring-2" />
      </div>

      <div className="contact-grid">
        <Reveal className="contact-content">
          <span className="eyebrow">
            <Sparkles size={14} className="text-violet" /> THE NEXT INITIATIVE
          </span>

          <h2 className="contact-title">
            Let's Build Something <span className="gradient-text">Intelligent</span><span className="period">.</span>
          </h2>

          <p className="contact-description">
            I'm currently seeking high-impact opportunities in <strong className="text-white">AI/ML Engineering</strong> and <strong className="text-white">Python Development</strong>. Whether you have an open engineering role, a machine-learning challenge, or a full-stack project, let's connect.
          </p>

          <div className="contact-actions">
            <a
              className="button button-primary contact-main-btn"
              href={`mailto:${email}?subject=Opportunity%20Discussion%20-%20Subash%20Mahendran`}
            >
              <Mail size={16} />
              <span>Start an Email Conversation</span>
            </a>

            <button
              type="button"
              className="button button-quiet"
              onClick={copyEmail}
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy subashrcm61@gmail.com</span>
                </>
              )}
            </button>

            <a
              className="button button-quiet"
              href="/resume.pdf"
              download="Subash_Mahendran_Resume.pdf"
              aria-label="Download official résumé PDF"
            >
              <Download size={16} />
              <span>Download Official Résumé</span>
            </a>
          </div>

          <div className="contact-location-tag mono">
            <MapPin size={14} className="text-violet" />
            <span>Based in Chennai, India &bull; Open to Remote & Relocation Opportunities</span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="contact-channels-card">
          <h3 className="channels-heading mono">DIRECT CHANNELS</h3>
          
          <div className="channels-list">
            <a
              href="https://www.linkedin.com/in/subash-mahendran"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-row"
            >
              <div className="channel-icon-box">
                <Linkedin size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label mono">LINKEDIN</span>
                <span className="channel-val">in/subash-mahendran</span>
              </div>
              <ArrowUpRight size={16} className="channel-arrow" />
            </a>

            <a
              href="https://github.com/Subash403"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-row"
            >
              <div className="channel-icon-box">
                <Github size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label mono">GITHUB</span>
                <span className="channel-val">github.com/Subash403</span>
              </div>
              <ArrowUpRight size={16} className="channel-arrow" />
            </a>

            <a
              href={`mailto:${email}`}
              className="channel-row"
            >
              <div className="channel-icon-box">
                <Mail size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label mono">DIRECT EMAIL</span>
                <span className="channel-val">{email}</span>
              </div>
              <ArrowUpRight size={16} className="channel-arrow" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-row"
            >
              <div className="channel-icon-box">
                <Download size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label mono">VIEW RÉSUMÉ</span>
                <span className="channel-val">PDF Document (2026 Edition)</span>
              </div>
              <ExternalLink size={16} className="channel-arrow" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
