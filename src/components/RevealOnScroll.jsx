import { useEffect, useRef } from 'react'

export default function RevealOnScroll({ children, className = '', delay = 0, threshold = 0.08 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on')
          const tag = e.target.querySelector('.sec-tag')
          if (tag) setTimeout(() => tag.classList.add('line-on'), 200)
        }
      })
    }, { threshold })

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const delayClass = delay === 1 ? 'reveal-d1' : delay === 2 ? 'reveal-d2' : delay === 3 ? 'reveal-d3' : ''

  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
