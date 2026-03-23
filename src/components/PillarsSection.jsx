import RevealOnScroll from './RevealOnScroll'
import styles from './PillarsSection.module.css'

const pillars = [
  {
    num: '01',
    title: 'Store Locally',
    desc: 'Your music stays on your machine. emerge creates lightweight fingerprints — your files are never uploaded or shared.',
  },
  {
    num: '02',
    title: 'Index & Search',
    desc: 'Every track is analysed for similarity, mood, and texture. Search by sound, not just metadata.',
  },
  {
    num: '03',
    title: 'Connect & Discover',
    desc: 'Share fingerprints with the network. Discover new music through artists who sound like you.',
  },
]

export default function PillarsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.num} delay={i + 1}>
              <div className={styles.pillar}>
                <span className={styles.num}>{p.num}</span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
