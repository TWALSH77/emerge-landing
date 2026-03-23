import useScrollProgress from './hooks/useScrollProgress'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import ClickEcho from './components/ClickEcho'
import Nav from './components/Nav'
import HeroSection from './components/HeroSection'
import VideoSection from './components/VideoSection'
import PillarsSection from './components/PillarsSection'
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
        <VideoSection />
        <PillarsSection />
        <DownloadSection />
        <Footer />
      </main>
    </>
  )
}
