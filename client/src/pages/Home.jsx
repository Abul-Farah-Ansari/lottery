import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HistoryTable from "../components/HistoryTable";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollTop";
import characterImage from "../assets/images/new-character-(1).jpg";
import Disclaimer from "../components/Disclaimer";

function Home() {
  return (
    <>
      {/* ==========================
          Navigation
      ========================== */}
      <Navbar />

      {/* ==========================
          Main Homepage Content
      ========================== */}
      <main>
        {/* Hero / Live Results */}
        <Hero />

        {/* Mobile Decorative Character */}
        <div
          className="mobile-character"
          aria-hidden="true"
        >
          <img
            src={characterImage}
            alt=""
            className="mobile-character-img"
          />
        </div>

        {/* Previous Winning Results */}
        <HistoryTable />

        {/* Disclaimer */}
        <Disclaimer />
      </main>

      {/* ==========================
          Footer
      ========================== */}
      <Footer />

      {/* Scroll To Top */}
      <ScrollToTop />
    </>
  );
}

export default Home;