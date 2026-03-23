import { useEffect, useRef } from 'react'

export default function useVinylSpin(baseSpeed = 0.018, scrollFactor = 0.09) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let angle = 0
    let velocity = 0
    let lastScrollY = window.scrollY
    let raf

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      velocity += delta * scrollFactor
    }

    const animate = () => {
      velocity *= 0.94
      angle += baseSpeed + velocity
      el.style.transform = `rotate(${angle}deg)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [baseSpeed, scrollFactor])

  return ref
}
