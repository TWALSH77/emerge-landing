import FeatureRow from './FeatureRow'
import discoverImg from '../assets/screenshots/discover.png'

export default function DiscoverSection() {
  return (
    <FeatureRow
      tag="Discover"
      heading="Your library becomes part<br/>of something larger."
      description="Share your music through the emerge fingerprint network. Your files stay on your machine, but others can discover what you have, listen, and connect."
      image={discoverImg}
      imageAlt="emerge discover view with artist profiles and published tracks"
    />
  )
}
