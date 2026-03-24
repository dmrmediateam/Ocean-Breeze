import Amenities from "./components/Amenities";
import Enquiry from "./components/Enquiry";
import FeatureSplitA from "./components/FeatureSplitA";
import FeatureSplitB from "./components/FeatureSplitB";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Location from "./components/Location";
import Navbar from "./components/Navbar";
import VideoFeature from "./components/VideoFeature";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="site-shell">
        <Hero />
        <VideoFeature />
        <Intro />
        <Gallery />
        <Amenities />
        <FeatureSplitA />
        <FeatureSplitB />
        <Location />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
