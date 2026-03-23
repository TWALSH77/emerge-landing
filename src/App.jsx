import useScrollProgress from './hooks/useScrollProgress'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import ClickEcho from './components/ClickEcho'
import Nav from './components/Nav'
import HeroSection from './components/HeroSection'
import VideoSection from './components/VideoSection'
import FeaturesSection from './components/FeaturesSection'
import AboutSection from './components/AboutSection'
import DownloadSection from './components/DownloadSection'
import ContactSection from './components/ContactSection'
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
        <FeaturesSection />
        <AboutSection />
        <DownloadSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
