'use client';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 z-50">
      <div className="text-xl font-bold text-indigo-600">Arshpreet Singh</div>
      <div className="space-x-4 text-gray-700 font-medium hidden sm:flex">
        <a href="#about" className="hover:text-indigo-600">About</a>
        <a href="#projects" className="hover:text-indigo-600">Projects</a>
        <a href="#contact" className="hover:text-indigo-600">Contact</a>
      </div>
    </nav>
  );
}
