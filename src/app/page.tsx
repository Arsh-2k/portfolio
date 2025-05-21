import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 text-white flex items-center justify-center px-4">
        <div className="text-center mt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Arshpreet Singh</h1>
          <p className="text-lg md:text-2xl">Aspiring Developer | B.Tech CSE Student</p>
        </div>
      </main>

      {/* About Me Section */}
      <section
        id="about"
        className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600">About Me</h2>
          <p className="text-lg leading-7">
            I&apos;m <strong>Arshpreet Singh</strong>, a B.Tech CSE student passionate about development, coding, and building
            cool stuff on the web. I love learning new technologies, and I&apos;m currently diving deep into frontend development
            using React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </section>
    </>
  );
}

