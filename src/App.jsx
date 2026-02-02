import Globe from './components/Globe'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      
      {/* Globe as hero background */}
      <Globe />
      
      {/* Hero section overlays the globe */}
      <Hero />
      
      {/* Portfolio sections */}
      <About />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  )
}

export default App
