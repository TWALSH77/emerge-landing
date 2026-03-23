import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logo}>emerge</div>
      </div>
      <div className={styles.center}>
        <a href="#download" className={styles.link}>Download</a>
        <a href="#demo" className={styles.link}>Demo</a>
        <a href="mailto:ted@emergesound.ai" className={styles.link}>Contact</a>
      </div>
      <div className={styles.right}>
        <div className={styles.copy}>&copy; 2026 emerge</div>
      </div>
    </footer>
  )
}
