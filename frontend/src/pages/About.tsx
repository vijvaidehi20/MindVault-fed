import React, { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
import './Home.css';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <Element name="about" className="element">
      <section
        id="about"
        ref={aboutRef}
        className="min-h-screen px-8 py-16 flex flex-col items-center justify-center bg-[#0d0512] fade-in-section"
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
        <div className="max-w-4xl text-left text-lg leading-relaxed text-gray-300">
          <ul className="list-none space-y-8">
            <li className="flex items-start">
              <span className="text-4xl mr-4 text-pink-400">📑</span>
              <div>
                <h4 className="text-2xl font-semibold funky-font-title text-pink-400">Smart Summaries & Mind Maps</h4>
                <p className="mt-2 text-gray-300">
                  Upload your notes in PDF, PPT, or image formats and instantly get concise summaries and visual mind maps powered by AI. No more endless scrolling.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-4xl mr-4 text-pink-400">🧠</span>
              <div>
                <h4 className="text-2xl font-semibold funky-font-title text-pink-400">Personalized Quizzes & Flashcards</h4>
                <p className="mt-2 text-gray-300">
                  Turn your study material into personalized quizzes and flashcards in seconds. Practice smarter with auto-generated questions that reinforce key concepts.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-4xl mr-4 text-pink-400">🤖</span>
              <div>
                <h4 className="text-2xl font-semibold funky-font-title text-pink-400">Interactive Q&A Chatbot</h4>
                <p className="mt-2 text-gray-300">
                  Stuck on a topic? Ask your doubts directly to our intelligent chatbot trained on your uploaded content and get clear, contextual answers instantly.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-4xl mr-4 text-pink-400">📱</span>
              <div>
                <h4 className="text-2xl font-semibold funky-font-title text-pink-400">Your Personal Knowledge Vault</h4>
                <p className="mt-2 text-gray-300">
                  Save your processed notes, summaries, and quizzes in one place. Organize everything neatly and access your personal knowledge vault whenever you need it.
                </p>
              </div>
            </li>
          </ul>
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
    </Element>
  );
};

export default About;