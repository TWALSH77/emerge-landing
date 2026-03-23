import styles from './ScreenshotCard.module.css'

export default function ScreenshotCard({ src, alt, maxWidth }) {
  return (
    <div className={styles.card} style={maxWidth ? { maxWidth, margin: '0 auto' } : undefined}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  )
}
