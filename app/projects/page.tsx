import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
