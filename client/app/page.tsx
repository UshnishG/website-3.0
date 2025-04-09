import Navbar from "@/components/navbar/page"
import Hero from "@/components/hero/page"
import Gallery from "@/components/gallery/page"
import Portfolio from "@/components/portfolio/page"
import Contact from "@/components/contact/page"
import Footer from "@/components/footer/page"

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


