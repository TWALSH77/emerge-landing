import { useEffect, useRef } from 'react'
import styles from './ParticleField.module.css'

const PARTICLE_COUNT = 80
const CONNECT_DIST = 140
const MOUSE_RADIUS = 120
const MOUSE_FORCE = 0.6

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w, h, dpr
    let animId
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      dpr = window.devicePixelRatio || 1
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Create particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.6,
      opacity: Math.random() * 0.4 + 0.15,
    }))

    function draw() {
      ctx.clearRect(0, 0, w, h)

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!prefersReduced) {
          // Mouse repulsion
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }

          // Dampen velocity
          p.vx *= 0.98
          p.vy *= 0.98

          // Move
          p.x += p.vx
          p.y += p.vy

          // Wrap edges
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    function onMouseMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
    </div>
  )
}
