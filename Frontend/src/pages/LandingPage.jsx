import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Community from "../components/Community";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <Community />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
