import { useEffect, useRef } from 'react'

export default function useScrollReveal(threshold = 0.08) {
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

    el.classList.add('reveal')
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return ref
}
