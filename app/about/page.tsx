import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <About />
      </main>
      <Footer />
    </>
  );
}
