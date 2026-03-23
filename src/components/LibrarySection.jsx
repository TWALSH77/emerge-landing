import FeatureRow from './FeatureRow'
import libraryImg from '../assets/screenshots/library.png'

export default function LibrarySection() {
  return (
    <FeatureRow
      tag="Your Library"
      heading="Point it at your music.<br/>Everything else follows."
      description="emerge scans every track and creates an audio fingerprint. That fingerprint powers everything: search, similarity, discovery."
      image={libraryImg}
      imageAlt="emerge library view showing indexed tracks"
    />
  )
}
