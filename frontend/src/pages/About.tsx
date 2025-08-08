import React, { useEffect, useRef } from 'react';
import { Element, scroller } from 'react-scroll';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import './Home.css';
import './about.css'; // Make sure this is imported for custom About page styles

const About: React.FC = () => {
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // A component for the feature cards, consistent with the homepage
  const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="feature-card flex-1 min-w-0">
      <div className="text-center">
        <div className="text-4xl mb-4 text-purple-400">{icon}</div>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-description">{description}</p>
      </div>
    </div>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGetStartedClick = () => {
    navigate('/signup');
  };
  
  const handleScrollTo = (section: string) => {
    scroller.scrollTo(section, {
      smooth: true,
      duration: 500,
      offset: -70, // Adjust for navbar height
    });
  };

  return (
    <Element name="about" className="element">
      {/* FULL NAVBAR from Home (1).tsx */}
      <nav className="nav-bar fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
          {/* Left: MindVault Logo */}
          <a
            onClick={() => navigate('/')}
            className="nav-logo cursor-pointer transition whitespace-nowrap"
          >
            MindVault
          </a>

          {/* Center: Navigation Tabs */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <a
              className="nav-link cursor-pointer transition-colors capitalize"
              onClick={() => navigate('/')}
            >
              Home
            </a>
            <a
              className="nav-link cursor-pointer transition-colors capitalize"
              onClick={() => handleScrollTo('explore')}
            >
              Explore
            </a>
            <a
              className="nav-link cursor-pointer transition-colors capitalize"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </a>
            <a
              className="nav-link cursor-pointer transition-colors capitalize"
              onClick={() => handleScrollTo('about')}
            >
              About
            </a>
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

      <section
        id="about"
        ref={aboutRef}
        className="min-h-screen px-8 py-16 flex flex-col items-center justify-center bg-[#0d0512] fade-in-section pt-24" // Added pt-24 for navbar spacing
      >
        <h2 className="text-4xl font-bold mb-6 text-center funky-font-title">About MindVault</h2>
        <div className="max-w-4xl text-center text-lg leading-relaxed text-gray-300">
          <p className="mb-6">
            MindVault is an AI-powered centralized workspace designed to address the challenges students face in managing and understanding a large volume of educational resources—from notes and PDFs to lecture recordings and tutorials. Traditional tools are often fragmented, lacking seamless AI integration and personalized learning features. MindVault solves this by providing a unified, intelligent platform.
          </p>
          <p className="mb-6">
            Our platform turns passive content into active learning tools by offering a unified space for note-taking, Q&A, and summarization. It uses Retrieval-Augmented Generation (RAG) to provide personalized answers based on a student's own materials and can convert static content into dynamic visual representations like mind maps. The system is built on a robust tech stack, including React.js for the frontend, Node.js and Express for the backend, and MongoDB for data storage. It integrates with LangChain and OpenAI for its core AI capabilities.
          </p>
        </div>

        <h3 className="text-3xl font-bold mt-16 mb-8 text-center funky-font-title">Our Features</h3>
        <div className="explore-cards-row flex flex-wrap justify-center items-center gap-8 w-full max-w-6xl">
          <FeatureCard
            icon="📑"
            title="Smart Summaries & Mind Maps"
            description="Upload your notes in PDF, PPT, or image formats and instantly get concise summaries and visual mind maps powered by AI. No more endless scrolling."
          />
          <FeatureCard
            icon="🧠"
            title="Personalized Quizzes & Flashcards"
            description="Turn your study material into personalized quizzes and flashcards in seconds. Practice smarter with auto-generated questions that reinforce key concepts."
          />
          <FeatureCard
            icon="🤖"
            title="Interactive Q&A Chatbot"
            description="Stuck on a topic? Ask your doubts directly to our intelligent chatbot trained on your uploaded content and get clear, contextual answers instantly."
          />
          <FeatureCard
            icon="📱"
            title="Your Personal Knowledge Vault"
            description="Save your processed notes, summaries, and quizzes in one place. Organize everything neatly and access your personal knowledge vault whenever you need it."
          />
        </div>

        <h3 className="text-3xl font-bold mt-16 mb-8 text-center funky-font-title">Future Scope</h3>
        <div className="max-w-4xl text-left text-lg leading-relaxed text-gray-300">
          <p className="mb-4">
            We are continuously working to expand MindVault's capabilities. Our upcoming features include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-left mx-auto max-w-lg">
            <li>Voice note transcription: Automatically convert your voice memos into searchable text.</li>
            <li>Chat history: Save your conversations with the AI chatbot for future reference.</li>
            <li>Collaborative study features: Work on notes and projects with your peers in real-time.</li>
            <li>AI-powered calendar planning: Get smart suggestions for your study schedule based on your workload and deadlines.</li>
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
    </Element>
  );
};

export default About;