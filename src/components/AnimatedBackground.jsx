import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Capped particle pool for optimal performance
    const particleCount = window.innerWidth < 768 ? 32 : 65
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.28,
        speedY: (Math.random() - 0.5) * 0.28 - 0.08,
        alpha: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.45 ? '161, 132, 255' : '128, 220, 255', // violet or ice-blue
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    let isDocumentVisible = true
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = () => {
      if (!isDocumentVisible || reducedMotion) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${p.color}, 0.6)`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className="cinematic-bg-container" aria-hidden="true">
      {/* Deep gradient base */}
      <div className="cinematic-base-gradient" />

      {/* Floating ambient light fields */}
      <div className="ambient-light-field field-violet" />
      <div className="ambient-light-field field-blue" />
      <div className="ambient-light-field field-indigo" />

      {/* Perspective grid lines */}
      <div className="cinematic-perspective-grid" />

      {/* Drifting star/dust particle canvas */}
      <canvas ref={canvasRef} className="cinematic-particles-canvas" />

      {/* Subtle sweeping light shimmer */}
      <div className="cinematic-light-sweep" />

      {/* Noise grain texture */}
      <div className="cinematic-noise-texture" />
    </div>
  )
}
