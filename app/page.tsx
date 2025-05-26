'use client';

import Navbar from './components/Navbar';
import MainSection from './sections/main';
import About from './sections/about';
import Projects from './sections/Projects';
import ToolsTech from './sections/tools-tech';
import Contact from './sections/contact';
import IdeaVault from './sections/IdeaVault';
import SectionWrapper from './components/SectionWrapper';

export default function Home() {
  return (
    <>
      {/* 🌌 Persistent Navbar */}
      <Navbar />

      {/* 🧭 Main Content Area with Semantic Sections */}
      <main id="main-content" role="main" className="relative z-10 overflow-x-hidden">
        <SectionWrapper id="home">
          <MainSection />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="projects">
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="tools-tech">
          <ToolsTech />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>

        <SectionWrapper id="idea-vault">
          <IdeaVault />
        </SectionWrapper>
      </main>
    </>
  );
}
