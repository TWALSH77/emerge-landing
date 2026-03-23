import RevealOnScroll from './RevealOnScroll'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <RevealOnScroll>
          <h2 className={styles.heading}>Get in touch</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <p className={styles.sub}>
            Questions, feedback, or just want to say hello. We'd love to hear from you.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <a href="mailto:ted@emergesound.ai" className={styles.email}>ted@emergesound.ai</a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
