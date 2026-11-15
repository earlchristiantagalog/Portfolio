import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
