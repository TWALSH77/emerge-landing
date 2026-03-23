import styles from './Nav.module.css'

export default function Nav({ scrolled }) {
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>emerge</a>
      <a href="#download" className={styles.btnNav}>Download for Mac</a>
    </nav>
  )
}
