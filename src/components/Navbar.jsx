import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react'

const navLinks = [
  ['Work', '#work'],
  ['Sandbox', '#demo'],
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Certifications', '#certifications'],
  ['Awards', '#achievements'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function goTo(id) {
    setOpen(false)
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="Subash Mahendran - Home">
          SUBASH<span>.M</span>
        </a>

        <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault()
                goTo(href)
              }}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-resume-link"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View official résumé in new tab"
          >
            <FileText size={14} />
            <span>Résumé</span>
          </a>
          <a
            className="nav-cta"
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              goTo('#contact')
            }}
          >
            <span>Let's talk</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}