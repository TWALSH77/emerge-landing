import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 65%)',
        pointerEvents: 'none',
        transform: 'translate(-50%,-50%)',
        transition: 'left 0.12s ease, top 0.12s ease',
        zIndex: 2,
        left: '50%',
        top: '50%',
      }}
    />
  )
}
