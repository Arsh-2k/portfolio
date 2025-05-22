// app/page.tsx
'use client';

import Navbar from "./components/Navbar";
import MainSection from "./sections/main";
import About from "./sections/about";
import Projects from "./sections/Projects";
import Contact from "./sections/contact";
import IdeaVault from "./sections/IdeaVault"; 

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <MainSection />
        <About />
        <Projects />
        <Contact /> 
        <IdeaVault />
      </main>
    </>
  );
}


