import { useEffect, useRef, useCallback } from 'react'
import styles from './HeroSection.module.css'

function VectorLandscape() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000
    mouseRef.current.y = -1000
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w, h, dpr, animId

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Generate clusters (like UMAP projections of audio embeddings)
    const CLUSTER_COUNT = 14
    const POINT_COUNT = 420
    const CONNECT_DIST = 55
    const MOUSE_RADIUS = 180

    const clusters = Array.from({ length: CLUSTER_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      driftX: (Math.random() - 0.5) * 0.00015,
      driftY: (Math.random() - 0.5) * 0.00015,
      phase: Math.random() * Math.PI * 2,
      breathRate: 0.3 + Math.random() * 0.4,
      breathAmp: 0.01 + Math.random() * 0.015,
    }))

    const points = Array.from({ length: POINT_COUNT }, () => {
      const cluster = clusters[Math.floor(Math.random() * CLUSTER_COUNT)]
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * 0.08 + Math.random() * 0.04
      return {
        baseX: cluster.x + Math.cos(angle) * dist,
        baseY: cluster.y + Math.sin(angle) * dist,
        cluster,
        offsetPhase: Math.random() * Math.PI * 2,
        offsetSpeed: 0.2 + Math.random() * 0.5,
        offsetAmp: 0.003 + Math.random() * 0.008,
        size: 0.6 + Math.random() * 1.6,
        brightness: 0.15 + Math.random() * 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        x: 0,
        y: 0,
      }
    })

    let time = 0

    function draw() {
      time += 0.008
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Update cluster positions (slow drift + breathing)
      for (const c of clusters) {
        c.x += c.driftX
        c.y += c.driftY
        // Soft boundaries — reverse drift near edges
        if (c.x < 0.05 || c.x > 0.95) c.driftX *= -1
        if (c.y < 0.05 || c.y > 0.95) c.driftY *= -1
      }

      // Update point positions
      for (const p of points) {
        const breath = Math.sin(time * p.cluster.breathRate + p.cluster.phase) * p.cluster.breathAmp
        const ox = Math.sin(time * p.offsetSpeed + p.offsetPhase) * p.offsetAmp
        const oy = Math.cos(time * p.offsetSpeed * 0.7 + p.offsetPhase) * p.offsetAmp

        p.x = (p.baseX + p.cluster.x * 0 + ox + breath) * w
        // We want baseX to move with cluster drift
        p.x = (p.baseX + (p.cluster.x - 0.5) * 0.3 + ox) * w
        p.y = (p.baseY + (p.cluster.y - 0.5) * 0.3 + oy) * h

        // Mouse repulsion
        if (mx > 0) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 25
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }
      }

      // Draw connections
      ctx.lineWidth = 0.5
      for (let i = 0; i < points.length; i++) {
        const a = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12

            // Brighten connections near mouse
            let boost = 0
            if (mx > 0) {
              const midX = (a.x + b.x) / 2
              const midY = (a.y + b.y) / 2
              const mDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2)
              if (mDist < MOUSE_RADIUS) {
                boost = (1 - mDist / MOUSE_RADIUS) * 0.15
              }
            }

            ctx.strokeStyle = `rgba(255,255,255,${alpha + boost})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw points
      for (const p of points) {
        const pulse = 0.7 + 0.3 * Math.sin(time * p.pulseSpeed + p.pulsePhase)
        let alpha = p.brightness * pulse

        // Mouse proximity brightening
        if (mx > 0) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            alpha += (1 - dist / MOUSE_RADIUS) * 0.5
          }
        }

        const r = p.size * pulse

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.04})`
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha, 0.8)})`
        ctx.fill()
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

export default function HeroSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add(styles.visible))
  }, [])

  return (
    <section className={styles.hero} ref={containerRef}>
      <VectorLandscape />
      <div className={styles.overlay} />

      <div className={styles.center}>
        <h1 className={styles.logo}>emerge</h1>
        <p className={styles.tagline}>Your music, understood.</p>

        <div className={styles.buttons}>
          <a href="#download" className={styles.btnPrimary}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </a>
          <a href="#demo" className={styles.btnSecondary}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </a>
          <a href="#about" className={styles.btnSecondary}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
