import Navbar from "./components/Navbar";
import MainSection from "./sections/main";
import About from "./sections/about";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <MainSection />
        <About />
      </main>
    </>
  );
}

