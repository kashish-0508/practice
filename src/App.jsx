import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import OfferSection from "./components/OfferSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <Preloader onComplete={() => setIsLoaded(true)} />
      )}

      <Navbar isLoaded={isLoaded} />
      <Hero isLoaded={isLoaded} />
      <AboutSection isLoaded={isLoaded} />
      <OfferSection isLoaded={isLoaded} />
      <TestimonialsSection isLoaded={isLoaded} />
      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;