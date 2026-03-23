import FeatureRow from './FeatureRow'
import similarImg from '../assets/screenshots/similar.png'

export default function SimilarSection() {
  return (
    <FeatureRow
      tag="Find Similar"
      heading="Select a track.<br/>Hear what matches."
      description="Pick any track in your library and emerge shows you everything that sounds like it, ranked by how close the match is. Songs, samples, loops."
      image={similarImg}
      imageAlt="emerge similarity search results with match percentages"
    />
  )
}
