import RevealOnScroll from './RevealOnScroll'
import styles from './VideoSection.module.css'

export default function VideoSection() {
  return (
    <section id="demo" className={styles.section}>
      <div className={styles.container}>
        <RevealOnScroll>
          <h2 className={styles.heading}>See it in action</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <div className={styles.videoWrap}>
            <video
              className={styles.video}
              src="/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
