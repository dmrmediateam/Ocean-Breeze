import Amenities from "./components/Amenities";
import CinematicBreak from "./components/CinematicBreak";
import Enquiry from "./components/Enquiry";
import FeatureSplitA from "./components/FeatureSplitA";
import FeatureSplitB from "./components/FeatureSplitB";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import ImageStrip from "./components/ImageStrip";
import InvestmentStats from "./components/InvestmentStats";
import Location from "./components/Location";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="site-shell">
        <Hero />
        <ImageStrip />
        <Gallery />
        <Amenities />
        <FeatureSplitA />
        <FeatureSplitB />
        <CinematicBreak />
        <InvestmentStats />
        <Location />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
