import Hero from '../components/Hero'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div>
        <Navbar/>
      <Hero />
      <About />
      <Footer/>
      
    </div>
  )
}

