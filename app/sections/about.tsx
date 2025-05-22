// app/sections/about.tsx

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
      <p className="text-lg md:text-xl max-w-3xl text-center leading-relaxed">
        I{" ' "}m <span className="text-purple-400 font-semibold">Arshpreet Singh</span>, a passionate developer focused on web technologies, open source contribution, and writing clean, scalable code. Outside of tech, I enjoy playing chess ♟️ and solving logic puzzles.
      </p>
    </section>
  );
}



