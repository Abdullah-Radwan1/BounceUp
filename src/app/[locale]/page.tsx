import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutComponent from "../components/Home/AboutComponent";
import ServicesComponent from "../components/Home/ServicesComponent";
import ProcessContact from "../components/Home/ProcessContact";
import EcosystemComponent from "../components/Home/EcosystemComponent";
import ContactComponent from "../components/Home/ContactComponent";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <AboutComponent />
        <ServicesComponent />
        <ProcessContact />
        <EcosystemComponent />
        <ContactComponent />
      </main>
      <Footer />
    </div>
  );
}
