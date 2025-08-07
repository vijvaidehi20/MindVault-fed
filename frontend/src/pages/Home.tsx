import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Renamed react-scroll Link
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Imported Router Link
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleUploadNotesClick = () => {
    navigate('/upload-notes');
  };

  const FeatureCard = ({ icon, title, description, buttonText, onClick }: { icon: string, title: string, description: string, buttonText?: string, onClick?: () => void }) => (
    <div className="feature-card flex-1 min-w-0">
      <div className="text-center">
        <div className="text-4xl mb-4 text-purple-400">{icon}</div>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-description">{description}</p>
      </div>
      {buttonText && onClick && (
        <button className="primary-btn w-full" onClick={onClick}>
          {buttonText}
        </button>
      )}
    </div>
  );

  return (
    <div className="home-container font-sans">
      {/* NAVBAR */}
      <nav className="nav-bar fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
          {/* Left: MindVault Logo - now a RouterLink */}
          <RouterLink
            to="/"
            className="nav-logo cursor-pointer transition whitespace-nowrap"
          >
            MindVault
          </RouterLink>

          {/* Center: Navigation Tabs - still using ScrollLink */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            {['home', 'explore', 'howItWorks', 'about'].map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link cursor-pointer transition-colors capitalize"
              >
                {section.replace(/([A-Z])/g, ' $1')}
              </ScrollLink>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="flex space-x-4">
            <button className="glow-btn" onClick={handleLoginClick}>
              Login
            </button>
            <button className="primary-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-24 pb-16 flex flex-col justify-center items-center text-center px-6 min-h-screen">
        <div className="fade-in-section">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to MindVault</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
            Unlock smarter learning with AI-powered PDF summarization, note generation, and concept mapping.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="primary-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
            <button className="glow-btn" onClick={() => console.log('Explore Features clicked')}>
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION with new cards */}
      <section id="explore" className="explore-container fade-in-section">
        <h2 className="funky-font-title mb-8">Explore MindVault</h2>
        <div className="explore-cards-row">
          <FeatureCard
            icon="📑"
            title="The PDF Summarizer built to help you learn."
            description="It's as simple as sending a text to Kai, and he'll explain everything to you easily."
            buttonText="Get Started"
            onClick={handleUploadNotesClick}
          />
          <FeatureCard
            icon="🧠"
            title="Quiz yourself on any PDF documents"
            description="Kai will quiz you! Studies show that's a lot more effective than reading."
            buttonText="Upload PDF"
            onClick={handleUploadNotesClick}
          />
          <FeatureCard
            icon="💬"
            title="Chat & Ask Questions with AI"
            description="Understand the document's key points better by asking for Kai's insight on your questions."
            buttonText="Chat with AI"
            onClick={() => console.log('Chat with AI clicked')}
          />
          <FeatureCard
            icon="📱"
            title="Summarize PDFs on the Go"
            description="Pick up where you left off on your PDF or other files by studying from your phone."
            buttonText="Download app"
            onClick={() => console.log('Download app clicked')}
          />
        </div>
      </section>

      {/* Placeholder sections: HIDDEN for now */}
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