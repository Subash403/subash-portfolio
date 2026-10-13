import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ExperienceTimeline from './components/ExperienceTimeline.jsx'
import ProjectGallery from './components/ProjectGallery.jsx'
import AiDemoSection from './components/AiDemoSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import CertificationGallery from './components/CertificationGallery.jsx'
import AchievementsSection from './components/AchievementsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import SectionDivider from './components/SectionDivider.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const mainRef = useRef(null)
  const finishLoading = useCallback(() => setLoading(false), [])

  useEffect(() => {
    if (loading || !mainRef.current) return
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        gsap.set('.hero-copy > *', { autoAlpha: 1, y: 0 })
        gsap.set('.hero-landscape-img', { scale: 1 })
        return
      }

      gsap.fromTo(
        '.hero-landscape-img',
        { scale: 1.08 },
        { scale: 1.02, duration: 1.8, ease: 'power2.out' },
      )

      gsap.fromTo(
        '.hero-copy > *',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.1 },
      )

      gsap.to('.hero-glow', {
        yPercent: 15,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, mainRef)

    return () => ctx.revert()
  }, [loading])

  return (
    <>
      {loading && <Preloader onComplete={finishLoading} />}
      <ScrollProgress />
      <div ref={mainRef} className={`app-shell ${loading ? 'is-loading' : 'is-ready'}`}>
        <AnimatedBackground />
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <SectionDivider label="SYS // PROFILE" accent="violet" />
          <AboutSection />
          <SectionDivider label="SYS // TIMELINE" accent="blue" />
          <ExperienceTimeline />
          <SectionDivider label="SYS // REPERTOIRE" accent="violet" />
          <ProjectGallery />
          <SectionDivider label="SYS // SANDBOX" accent="violet" />
          <AiDemoSection />
          <SectionDivider label="SYS // STACK" accent="blue" />
          <SkillsSection />
          <SectionDivider label="SYS // CREDENTIALS" accent="violet" />
          <CertificationGallery />
          <SectionDivider label="SYS // HONORS" accent="blue" />
          <AchievementsSection />
          <SectionDivider label="SYS // INITIATIVE" accent="violet" />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}