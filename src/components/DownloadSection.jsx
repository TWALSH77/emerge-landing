import RevealOnScroll from './RevealOnScroll'
import styles from './DownloadSection.module.css'

const DOWNLOAD_ARM = 'https://emerge-releases.s3.us-east-1.amazonaws.com/releases/v0.12.0/emerge_0.12.0_aarch64.dmg'
const DOWNLOAD_INTEL = 'https://emerge-releases.s3.us-east-1.amazonaws.com/releases/v0.12.0/emerge_0.12.0_x64.dmg'

export default function DownloadSection() {
  return (
    <section id="download" className={styles.section}>
      <div className={styles.container}>
        <RevealOnScroll>
          <h2 className={styles.heading}>
            The library you built<br />deserves better than a folder.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <p className={styles.sub}>Free to download. Mac only for now.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <div className={styles.cards}>
            <a href={DOWNLOAD_ARM} className={styles.card}>
              <div className={styles.chip}>Apple Silicon</div>
              <div className={styles.arch}>M1, M2, M3, M4</div>
              <div className={styles.btnRow}>
                <span className={styles.dlBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download .dmg
                </span>
              </div>
              <div className={styles.size}>v0.12.0 &middot; aarch64</div>
            </a>

            <a href={DOWNLOAD_INTEL} className={styles.card}>
              <div className={styles.chip}>Intel</div>
              <div className={styles.arch}>x86_64</div>
              <div className={styles.btnRow}>
                <span className={styles.dlBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download .dmg
                </span>
              </div>
              <div className={styles.size}>v0.12.0 &middot; x64</div>
            </a>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={3}>
          <p className={styles.fine}>Requires macOS 13 Ventura or later</p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
