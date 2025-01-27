import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pop from "./components/Pop";
import Footer from "./components/Footer";
import Map from "./components/Maps";
import Scrollprog from "./components/Scrollprog";
export default function Home() {
  
  return (
    <>
      {/* <Scrollprog/> */}
      <Navbar />
      <section id="home" className="min-h-screen w-full bg-custom mt-5">
        <Hero />
      </section>
      {/* <section id="home" className="min-h-screen w-full bg-custom "> */}
        <Pop />
      {/* </section> */}
      <section id="home" className="min-h-screen w-full bg-custom ">
        <Map />
      </section>
      <Footer />
    </>
  );
}
