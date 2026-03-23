import useScrollProgress from './hooks/useScrollProgress'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import ClickEcho from './components/ClickEcho'
import Nav from './components/Nav'
import HeroSection from './components/HeroSection'
import PillarsSection from './components/PillarsSection'
import LibrarySection from './components/LibrarySection'
import SimilarSection from './components/SimilarSection'
import DiscoverSection from './components/DiscoverSection'
import VideoSection from './components/VideoSection'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'

export default function App() {
  const { progress, scrolled } = useScrollProgress()

  return (
    <>
      <ScrollProgress progress={progress} />
      <CursorGlow />
      <ClickEcho />
      <Nav scrolled={scrolled} />
      <main>
        <HeroSection />
        <PillarsSection />
        <LibrarySection />
        <SimilarSection />
        <DiscoverSection />
        <VideoSection />
        <DownloadSection />
        <Footer />
      </main>
    </>
  )
}
