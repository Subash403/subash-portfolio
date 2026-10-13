import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { FastForward } from 'lucide-react'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setProgress(100)
      const timer = window.setTimeout(onComplete, 120)
      return () => window.clearTimeout(timer)
    }

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(counter.value)),
      onComplete,
    })

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        tween.kill()
        setProgress(100)
        onComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      tween.kill()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onComplete])

  return (
    <div className="preloader" aria-label={`Loading portfolio ${progress}%`}>
      <div className="preloader-glow" aria-hidden="true" />
      <div className="preloader-center">
        <div className="preloader-monogram">
          <span className="mono preloader-kicker">CINEMATIC PORTFOLIO // 2026</span>
          <h1 className="preloader-name">SUBASH MAHENDRAN</h1>
          <p className="preloader-role">AI/ML ENGINEER &bull; PYTHON DEVELOPER</p>
        </div>
      </div>

      <div className="preloader-bottom">
        <div className="preloader-info">
          <span className="eyebrow"><span className="status-dot" /> INITIALIZING 3D WORKSPACE</span>
          <span className="mono preloader-percent">{String(progress).padStart(3, '0')}%</span>
        </div>
        <div className="preloader-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader-skip-wrap">
          <button
            type="button"
            className="preloader-skip-btn"
            onClick={onComplete}
            aria-label="Skip introduction animation"
          >
            <span>Skip Intro [ESC]</span>
            <FastForward size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}