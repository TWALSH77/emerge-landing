import RevealOnScroll from './RevealOnScroll'
import SectionTag from './SectionTag'
import ScreenshotCard from './ScreenshotCard'
import styles from './FeatureRow.module.css'

export default function FeatureRow({
  tag,
  heading,
  description,
  image,
  imageAlt,
}) {
  const hasImage = !!image
  return (
    <div className={`${hasImage ? 'section' : ''} container ${!hasImage ? styles.textOnly : ''}`}>
      <div className={styles.row}>
        <RevealOnScroll className={styles.text}>
          <SectionTag center>{tag}</SectionTag>
          <h2 className="sec-h" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: heading }} />
          <p className="sec-p" style={{ textAlign: 'center', maxWidth: 520 }}>{description}</p>
        </RevealOnScroll>
        {hasImage && (
          <RevealOnScroll delay={1} className={styles.media}>
            <ScreenshotCard src={image} alt={imageAlt} />
          </RevealOnScroll>
        )}
      </div>
    </div>
  )
}
