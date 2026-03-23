import { useCallback } from 'react'
import styles from './ButtonPrimary.module.css'

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export default function ButtonPrimary({ children = 'Download for Mac', href = '#download', icon = true }) {
  const handleClick = useCallback((e) => {
    const btn = e.currentTarget
    const r = btn.getBoundingClientRect()
    const rip = document.createElement('span')
    rip.className = 'btn-ripple'
    rip.style.left = (e.clientX - r.left) + 'px'
    rip.style.top = (e.clientY - r.top) + 'px'
    btn.appendChild(rip)
    setTimeout(() => rip.remove(), 600)
  }, [])

  return (
    <a href={href} className={styles.btn} onClick={handleClick}>
      {icon && <DownloadIcon />}
      {children}
    </a>
  )
}
