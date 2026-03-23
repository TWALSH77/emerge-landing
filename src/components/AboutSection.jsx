import RevealOnScroll from './RevealOnScroll'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <RevealOnScroll>
            <h2 className={styles.heading}>About</h2>
          </RevealOnScroll>
          <div className={styles.content}>
            <RevealOnScroll delay={1}>
              <p className={styles.lead}>
                emerge is a desktop app for musicians, producers, and collectors who care about how music actually sounds, not just what it's tagged as.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <p className={styles.body}>
                Most tools stop at key, BPM, and genre. emerge goes deeper, analysing timbre, spectral texture, spatial characteristics, harmonic complexity, and micro-dynamics to build a rich understanding of every track in your library. Tracks are mapped into a high-dimensional vector space where sonic similarity determines proximity.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={3}>
              <p className={styles.body}>
                The result is a new way to navigate and discover music. Browse by feel instead of folder. Find connections across your collection that no metadata could reveal. Connect with a network of artists making music that sounds like yours.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
