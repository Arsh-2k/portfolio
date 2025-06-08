"use client";

import Navbar from "./components/Navbar";
import MainSection from "./sections/main";
import About from "./sections/about";
import Projects from "./sections/Projects";
import ToolsTech from "./sections/tools-tech";
import Contact from "./sections/contact";
import IdeaVault from "./sections/IdeaVault";
import SectionWrapper from "./components/SectionWrapper";

export default function Home() {
  return (
    <>
      {/* 🌌 Persistent Navbar */}
      <Navbar />

      {/* 📜 Snap-scrolling Main Content */}
      <main
        id="main-content"
        role="main"
        className="relative z-10 h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth"
      >
        {/* 🏠 Landing Section */}
        <SectionWrapper id="home">
          <MainSection />
        </SectionWrapper>

        {/* 👤 About Me */}
        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        {/* 💼 Projects */}
        <SectionWrapper id="projects">
          <Projects />
        </SectionWrapper>

        {/* 🛠️ Tools & Tech */}
        <SectionWrapper id="tools-tech">
          <ToolsTech />
        </SectionWrapper>

        {/* 📬 Contact */}
        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>

        {/* 💡 Idea Vault */}
        <SectionWrapper id="idea-vault">
          <IdeaVault />
        </SectionWrapper>
      </main>
    </>
  );
}
