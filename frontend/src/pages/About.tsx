import React from 'react';
import './about.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Added ScrollLink import
import './Home.css'; // Importing Home.css for navbar styles

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <div className="about-page-container">
      {/* Replaced simple navbar with the full, styled navbar from Home page */}
      <nav className="nav-bar fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
          {/* Left: MindVault Logo */}
          <RouterLink
            to="/"
            className="nav-logo cursor-pointer transition whitespace-nowrap"
          >
            MindVault
          </RouterLink>

          {/* Center: Navigation Tabs */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            {['home', 'explore', 'howItWorks', 'about'].map((section) => {
              if (section === 'home') {
                return (
                  <RouterLink
                    key={section}
                    to="/"
                    className="nav-link cursor-pointer transition-colors capitalize"
                  >
                    Home
                  </RouterLink>
                );
              }
              if (section === 'about') {
                return (
                  <RouterLink
                    key={section}
                    to="/about"
                    className="nav-link cursor-pointer transition-colors capitalize"
                  >
                    About
                  </RouterLink>
                );
              }
              return (
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
              );
            })}
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

      <section id="about" className="py-16">
        <div className="about-content">
          <h2 className="funky-font-title mb-8 text-center">About MindVault</h2>
          <p className="about-paragraph">
            MindVault is an AI-powered centralized workspace designed to address the challenges students face in managing and understanding a large volume of educational resources, from notes and PDFs to lecture recordings and tutorials. Existing tools are often fragmented, lacking seamless AI integration and personalized learning features.
          </p>
          <p className="about-paragraph">
            Our platform turns passive content into active learning tools by offering a unified space for note-taking, Q&A, and summarization. It uses Retrieval-Augmented Generation (RAG) to provide personalized answers based on a student's own materials and can convert static content into dynamic visual representations like mind maps. The system is built on a robust tech stack, including React.js for the frontend, Node.js and Express for the backend, and MongoDB for data storage. It integrates with LangChain and OpenAI for its core AI capabilities.
          </p>
          <h3 className="text-2xl font-bold mb-4 text-center">Future Scope</h3>
          <ul className="about-list">
            <li className="about-list-item">Voice note transcription</li>
            <li className="about-list-item">Chat history</li>
            <li className="about-list-item">Collaborative study features</li>
            <li className="about-list-item">AI-powered calendar planning</li>
          </ul>
        </div>
      </section>

      {/* Footer from Home page for consistency */}
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

export default AboutPage;