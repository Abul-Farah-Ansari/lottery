import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HistoryTable from "../components/HistoryTable";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollTop";
import characterImage from "../assets/images/character (1).png"


function Home() {
  return (
    <>
      <Navbar />
     <Hero />

<div className="mobile-character">
  <img
    src={characterImage}
    alt="Lottery Character"
    className="mobile-character-img"
  />
</div>

<HistoryTable />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;