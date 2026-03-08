import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Why from "../components/Why"
import Footer from "../components/Footer"

function Home({ setPage }) {
  return (
    <>
      <Navbar setPage={setPage} />
      <Hero />
      <Why />
      <Footer />
    </>
  )
}

export default Home