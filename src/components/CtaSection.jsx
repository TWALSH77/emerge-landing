import RevealOnScroll from './RevealOnScroll'
import ButtonPrimary from './ButtonPrimary'
import styles from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section id="download" className={styles.section}>
      <RevealOnScroll>
        <h2 className={styles.heading}>
          The library you built<br />deserves better than a folder.
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={1}>
        <p className={styles.sub}>Free to download. Mac only for now.</p>
      </RevealOnScroll>
      <RevealOnScroll delay={2}>
        <div className={styles.btnWrap}>
          <ButtonPrimary />
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={3}>
        <p className={styles.fine}>macOS 13 Ventura or later</p>
      </RevealOnScroll>
    </section>
  )
}
