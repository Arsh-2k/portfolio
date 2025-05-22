'use client';

import Navbar from "./components/Navbar";
import MainSection from "./sections/main";
import About from "./sections/about";
import Projects from "./sections/Projects";
import Contact from "./sections/contact";
import IdeaVault from "./sections/IdeaVault";
import SectionWrapper from "./components/SectionWrapper";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper>
          <MainSection />
        </SectionWrapper>
        <SectionWrapper>
          <About />
        </SectionWrapper>
        <SectionWrapper>
          <Projects />
        </SectionWrapper>

        {/* ⬇️ Switched order here */}
        <SectionWrapper>
          <Contact />
        </SectionWrapper>
        <SectionWrapper>
          <IdeaVault />
        </SectionWrapper>
      </main>
    </>
  );
}
