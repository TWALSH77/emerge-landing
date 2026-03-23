import RevealOnScroll from './RevealOnScroll'
import VinylDisc from './VinylDisc'
import styles from './FeaturesSection.module.css'

const features = [
  {
    title: 'Beyond key & BPM',
    desc: 'emerge analyses timbre, texture, spatial characteristics, harmonic complexity, and micro-dynamics. The qualities that actually define how music feels.',
  },
  {
    title: 'Search by sound',
    desc: 'Find tracks by how they sound, not by filename or tag. Similarity search across your entire library powered by high-dimensional audio embeddings.',
  },
  {
    title: 'Connect & discover',
    desc: 'Share fingerprints with the network. Discover artists and tracks that sit near you in the sound space.',
  },
]

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <RevealOnScroll>
          <div className={styles.headingRow}>
            <VinylDisc />
            <div>
              <h2 className={styles.heading}>How it works</h2>
              <p className={styles.headingSub}>Deep audio understanding, not just metadata.</p>
            </div>
          </div>
        </RevealOnScroll>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i + 1}>
              <div className={styles.feature}>
                <span className={styles.num}>0{i + 1}</span>
                <h3 className={styles.title}>{f.title}</h3>
                <p className={styles.desc}>{f.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
