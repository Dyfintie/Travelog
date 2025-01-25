import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pop from "./components/Pop";
import Footer from "./components/Footer";
import Map from "./components/Maps";
export default function Home() {
  return (
    <>
      <Navbar />
      <section id="home" className="min-h-screen w-full bg-green-200 mt-5">
        <Hero />
      </section>
      <section id="home" className="min-h-screen w-full bg-green-200 ">
        <Pop />
      </section>
      <section id="home" className="min-h-screen w-full bg-green-200 ">
        <Map />
      </section>
      <Footer />
    </>
  );
}
