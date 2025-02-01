import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pop from "./components/Pop";
import Footer from "./components/Footer";
import Map from "./components/Maps";
import Scrollprog from "./components/Scrollprog";
export default function Home() {
  
  return (
    <>
      <Navbar />
      <section className="min-h-screen w-full bg-custom md:mt-5 mt-2">
        <Hero />
      </section>
      <section className="w-full">
        <Pop />
      </section>
      <section className="min-h-screen w-full bg-custom ">
        <Map />
      </section>
      <Footer />
    </>
  );
}
