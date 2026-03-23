import { useEffect, useRef } from 'react'
import styles from './VectorSpace.module.css'

const POINT_COUNT = 180
const CONNECT_DIST = 0.18
const CLUSTER_COUNT = 6

export default function VectorSpace({ fullscreen = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w, h, dpr
    let animId
    let angleX = 0.3
    let angleY = 0
    const mouse = { x: 0.5, y: 0.5, active: false }

    function resize() {
      dpr = window.devicePixelRatio || 1
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Generate cluster centers
    const clusters = Array.from({ length: CLUSTER_COUNT }, () => ({
      x: (Math.random() - 0.5) * 1.6,
      y: (Math.random() - 0.5) * 1.6,
      z: (Math.random() - 0.5) * 1.6,
    }))

    // Generate points around clusters
    const points = Array.from({ length: POINT_COUNT }, () => {
      const cluster = clusters[Math.floor(Math.random() * CLUSTER_COUNT)]
      const spread = 0.15 + Math.random() * 0.12
      return {
        x: cluster.x + (Math.random() - 0.5) * spread,
        y: cluster.y + (Math.random() - 0.5) * spread,
        z: cluster.z + (Math.random() - 0.5) * spread,
        size: Math.random() * 1.4 + 0.6,
        brightness: Math.random() * 0.4 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    function project(x, y, z) {
      // Rotate around Y axis
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      let rx = x * cosY - z * sinY
      let rz = x * sinY + z * cosY

      // Rotate around X axis
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      let ry = y * cosX - rz * sinX
      rz = y * sinX + rz * cosX

      // Perspective projection
      const perspective = 2.8
      const scale = perspective / (perspective + rz)
      const sx = w / 2 + rx * scale * (w * 0.3)
      const sy = h / 2 + ry * scale * (h * 0.3)

      return { sx, sy, scale, depth: rz }
    }

    let time = 0

    function draw() {
      time += 0.006
      ctx.clearRect(0, 0, w, h)

      // Auto-rotate
      if (!prefersReduced) {
        angleY += 0.0015
      }

      // Mouse tilt
      if (mouse.active) {
        const targetX = 0.3 + (mouse.y - 0.5) * 0.3
        angleX += (targetX - angleX) * 0.02
        angleY += (mouse.x - 0.5) * 0.001
      }

      // Draw connections between nearby points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dz = a.z - b.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < CONNECT_DIST) {
            const pa = project(a.x, a.y, a.z)
            const pb = project(b.x, b.y, b.z)
            const alpha = (1 - dist / CONNECT_DIST) * 0.08 * Math.min(pa.scale, pb.scale)

            ctx.beginPath()
            ctx.moveTo(pa.sx, pa.sy)
            ctx.lineTo(pb.sx, pb.sy)
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Project and sort by depth
      const projected = points.map((p) => {
        const proj = project(p.x, p.y, p.z)
        return { ...proj, point: p }
      })
      projected.sort((a, b) => a.depth - b.depth)

      // Draw points
      for (const p of projected) {
        const pulse = Math.sin(time * 2 + p.point.pulse) * 0.15 + 0.85
        const alpha = p.point.brightness * p.scale * pulse
        const radius = p.point.size * p.scale * pulse

        // Glow
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, radius * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.04})`
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.y = (e.clientY - rect.top) / rect.height
      mouse.active = true
    }

    function onMouseLeave() {
      mouse.active = false
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div className={`${styles.wrap} ${fullscreen ? styles.fullscreen : ''}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {fullscreen && <div className={styles.vignette} />}
      {!fullscreen && <div className={styles.fade} />}
    </div>
  )
}
