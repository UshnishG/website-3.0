import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Gallery from "@/components/gallery"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="gallery"><Gallery /></div>
      <div id="portfolio"><Portfolio /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </main>
  );
}


