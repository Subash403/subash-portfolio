import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(element, { autoAlpha: 1, y: 0 })
      return
    }
    const tween = gsap.fromTo(element,
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, duration: 0.85, delay, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true } },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}