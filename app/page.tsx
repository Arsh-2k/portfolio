'use client';

import Navbar from './components/Navbar';
import MainSection from './sections/main';
import About from './sections/about';
import Projects from './sections/Projects';
import ToolsTech from './sections/tools-tech';  // Import ToolsTech
import Contact from './sections/contact';
import IdeaVault from './sections/IdeaVault';
import SectionWrapper from './components/SectionWrapper';

export default function Home() {
  return (
    <>
      {/* 🌌 Navigation bar */}
      <Navbar />

      {/* 🧭 Main content with accessibility landmarks */}
      <main role="main" id="main-content">
        <SectionWrapper id="home">
          <MainSection />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="projects">
          <Projects />
        </SectionWrapper>

        {/* ToolsTech moved here, before Contact */}
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

