import RevealOnScroll from './RevealOnScroll'
import styles from './PillarsSection.module.css'

const pillars = [
  {
    num: '01',
    title: 'Deep Understanding',
    desc: 'emerge goes beyond key and BPM. It analyses timbre, texture, spatial characteristics, and micro-dynamics to truly understand how your music sounds.',
  },
  {
    num: '02',
    title: 'Search by Sound',
    desc: 'Every track is mapped into a high-dimensional vector space. Search by sonic similarity, not just metadata.',
  },
  {
    num: '03',
    title: 'Connect & Discover',
    desc: 'Share fingerprints with the network. Discover new music through artists who sound like you.',
  },
]

export default function PillarsSection() {
  return (
    <section id="about" className={styles.section}>
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
