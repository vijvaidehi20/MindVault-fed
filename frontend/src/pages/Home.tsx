import React from 'react';
import { Link } from 'react-scroll';

const Home: React.FC = () => {
  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen w-full font-sans">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 shadow-lg">
        {/* Left: MindVault Logo */}
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="text-white text-xl font-bold cursor-pointer hover:text-purple-500 transition whitespace-nowrap"
        >
          MindVault
        </Link>

        {/* Center: Navigation Tabs */}
        <div className="flex space-x-8 text-lg font-medium">
          {['home', 'explore', 'howItWorks', 'about'].map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer hover:text-purple-400 transition-colors capitalize"
            >
              {section.replace(/([A-Z])/g, ' $1')}
            </Link>
          ))}
        </div>

        {/* Right: Buttons */}
        <div className="flex space-x-4">
          <button className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Login
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
            Get Started
          </button>
        </div>
      </nav>


      {/* HERO SECTION */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to MindVault</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
          Unlock smarter learning with AI-powered PDF summarization, note generation, and concept mapping.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">
            Get Started
          </button>
          <button className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black rounded transition">
            Explore Features
          </button>
        </div>
      </section>

      {/* Placeholder sections: HIDDEN for now */}
      {/* Remove "hidden" when you want them to show later */}

      <section id="explore" className="hidden min-h-screen px-8 py-16">
        <h2 className="text-4xl font-bold mb-6">Explore</h2>
      </section>

      <section id="howItWorks" className="hidden min-h-screen px-8 py-16">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
      </section>

      <section id="about" className="hidden min-h-screen px-8 py-16">
        <h2 className="text-4xl font-bold mb-6">About</h2>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0d0d] text-gray-400 py-6 text-center border-t border-gray-800 mt-10">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MindVault. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-3 text-sm">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>

    </div>
  );
};

export default Home;
