import FeatureRow from './FeatureRow'
import discoverImg from '../assets/screenshots/discover.png'

export default function DiscoverSection() {
  return (
    <FeatureRow
      tag="Discover"
      heading="When you're ready, your library becomes part of something&nbsp;larger."
      description="Share your music through the emerge fingerprint network. Your files stay on your machine, but others can discover what you have, listen, and request downloads."
      image={discoverImg}
      imageAlt="emerge discover view with artist profiles and published tracks"
    />
  )
}
