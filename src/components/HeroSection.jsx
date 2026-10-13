import { ArrowDown, ArrowRight, FileText, Github, Linkedin, ExternalLink, Mail } from 'lucide-react'
import HeroScene from './HeroScene.jsx'

export default function HeroSection() {
  return (
    <section id="home" className="hero hero-landscape-hero">
      {/* 1. Full-Bleed 100% Viewport Width Cinematic Landscape Background */}
      <div className="hero-landscape-backdrop" aria-hidden="true">
        <img
          src="/hero-landscape.jpg"
          alt="Cinematic digital landscape background with neon cyberpunk city, reflective lake, and futuristic mountains"
          className="hero-landscape-img"
          loading="eager"
          decoding="async"
        />
        {/* Dark gradient overlay on the left for maximum text contrast */}
        <div className="hero-landscape-vignette" />
        {/* Soft bottom horizon fade seamlessly transitioning to page background */}
        <div className="hero-landscape-bottom-fade" />
        {/* Interactive 3D particle & laser beam canvas */}
        <HeroScene />
      </div>

      {/* 2. Centered Max-Width Container (1200–1400px) */}
      <div className="hero-container">
        <div className="hero-layout hero-landscape-layout">
          <div className="hero-copy hero-landscape-copy">
            {/* Eyebrow Badge */}
            <div className="hero-eyebrow-wrap">
              <span className="eyebrow hero-eyebrow">
                <span className="status-dot" /> CHENNAI, INDIA &bull; AVAILABLE FOR ROLES &bull; 2026
              </span>
            </div>

            {/* Signature Bold Stacked Name */}
            <h1 className="hero-signature-name hero-stacked-name" aria-label="Subash Mahendran">
              <span className="name-line">SUBASH</span>
              <span className="name-line">MAHENDRAN</span>
            </h1>

            {/* Role Subtitle Banner */}
            <div className="hero-role-banner">
              <span className="hero-role-title">AI/ML ENGINEER</span>
              <span className="hero-role-separator">|</span>
              <span className="hero-role-title">PYTHON DEVELOPER</span>
            </div>

            {/* Tagline */}
            <p className="hero-tagline">
              Build intelligent systems. Turn ideas into real-world software.
            </p>

            {/* Descriptive Copy */}
            <p className="hero-description">
              B.Tech in Artificial Intelligence & Data Science. Specializing in predictive machine learning models, computer vision systems, and robust full-stack software delivery.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-actions">
              <a className="button button-primary button-landscape-primary" href="#work">
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </a>
              <a
                className="button button-quiet button-landscape-glass"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View official résumé in new tab"
              >
                <FileText size={15} />
                <span>View Resume</span>
                <ExternalLink size={13} className="opacity-70" />
              </a>
              <a className="button button-outline button-landscape-glass" href="#contact">
                <Mail size={15} />
                <span>Contact Me</span>
              </a>
              <div className="hero-social-strip">
                <a
                  className="button-icon-pill"
                  href="https://www.linkedin.com/in/subash-mahendran"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  className="button-icon-pill"
                  href="https://github.com/Subash403"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>

            {/* Verified Achievement Statistics Card */}
            <div className="hero-metrics-bar hero-landscape-metrics">
              <div className="metric-chip">
                <span className="mono metric-val">15+</span>
                <span className="metric-lbl">Delivered Projects</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-chip">
                <span className="mono metric-val">2026</span>
                <span className="metric-lbl">B.Tech AI & Data Science</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-chip">
                <span className="mono metric-val">OCI '25</span>
                <span className="metric-lbl">Data Science Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue positioned inside hero container */}
        <a className="scroll-cue" href="#about" aria-label="Scroll to About section">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}
