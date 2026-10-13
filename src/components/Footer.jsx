import { Github, Linkedin, Mail, Download, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer section-wrap">
      <div className="footer-top">
        <div className="footer-brand-wrap">
          <a className="brand" href="#home" aria-label="Subash Mahendran">
            SUBASH<span>.M</span>
          </a>
          <p className="footer-tagline">
            AI/ML Engineer &bull; Python Developer &bull; Chennai, India
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <span className="footer-col-title mono">EXPLORE</span>
            <a href="#work">Featured Work</a>
            <a href="#about">About Subash</a>
            <a href="#experience">Career Timeline</a>
            <a href="#skills">Technical Stack</a>
          </div>

          <div className="footer-col">
            <span className="footer-col-title mono">CREDENTIALS</span>
            <a href="#certifications">Certifications & Learning</a>
            <a href="#achievements">Honors & Awards</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Résumé</a>
          </div>
        </div>

        <button
          type="button"
          className="back-to-top-btn mono"
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
        >
          <ArrowUp size={16} />
          <span>TOP</span>
        </button>
      </div>

      <div className="footer-bottom">
        <div className="mono footer-note">
          &copy; {new Date().getFullYear()} SUBASH MAHENDRAN &bull; CODE WITH INTENT. BUILD WITH IMPACT.
        </div>

        <div className="social-links">
          <a
            href="https://github.com/Subash403"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subash on GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/subash-mahendran"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subash on LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:subashrcm61@gmail.com"
            aria-label="Send email to Subash"
          >
            <Mail size={18} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Résumé PDF"
          >
            <Download size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
