import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-mono transition-all duration-300">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl font-bold">MindVault</h1>
          <div className="flex items-center space-x-6 text-sm">
            <nav className="hidden md:flex space-x-6">
              <Link to="/get-started" className="hover:text-cyan-400">Get Started</Link>
              <a href="#features" className="hover:text-cyan-400">Features</a>
              <a href="#how" className="hover:text-cyan-400">How it Works</a>
              <a href="#testimonials" className="hover:text-cyan-400">Testimonials</a>
            </nav>
            <button
              onClick={toggleTheme}
              className="text-xl hover:text-cyan-400"
              title="Toggle Theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center py-20 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Your AI-powered memory vault.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Store notes, ideas, and reminders. MindVault transforms them into organized, actionable content with the power of AI.
          </p>
          <Link
            to="/get-started"
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-6 rounded-lg transition"
          >
            Get Started for Free
          </Link>
        </motion.section>

        {/* Features */}
        <motion.section
          id="features"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 px-6 py-16 border-t border-gray-200 dark:border-gray-800"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">AI Note Structuring</h3>
            <p className="text-gray-500 dark:text-gray-400">Convert messy text into titled, tagged, categorized notes using natural language processing.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
            <p className="text-gray-500 dark:text-gray-400">Set up reminders in natural language. MindVault understands what you mean.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Multi-format Input</h3>
            <p className="text-gray-500 dark:text-gray-400">Paste text, upload PDFs, or speak — we handle all input types with ease.</p>
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          id="how"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="px-6 py-20 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">How MindVault Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-6xl mb-4">📝</div>
              <h4 className="text-lg font-semibold mb-2">1. Add a Thought</h4>
              <p className="text-gray-600 dark:text-gray-400">Type, paste, or upload your unstructured ideas or notes.</p>
            </div>
            <div>
              <div className="text-6xl mb-4">🧠</div>
              <h4 className="text-lg font-semibold mb-2">2. AI Organizes</h4>
              <p className="text-gray-600 dark:text-gray-400">Our backend uses LLMs to structure, summarize, and tag your notes.</p>
            </div>
            <div>
              <div className="text-6xl mb-4">📂</div>
              <h4 className="text-lg font-semibold mb-2">3. Vault It</h4>
              <p className="text-gray-600 dark:text-gray-400">Access your organized content from personal vaults, or share it with others.</p>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          id="testimonials"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="px-6 py-20 border-t border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">What Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "I used to write thoughts in 10 different places. Now MindVault organizes everything for me, instantly."
              </p>
              <h4 className="text-sm font-bold text-cyan-400">– Ananya, Student</h4>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "It feels like Notion + ChatGPT + Reminders app, all in one tool. Super useful!"
              </p>
              <h4 className="text-sm font-bold text-cyan-400">– Raj, Product Manager</h4>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-10 border-t border-gray-200 dark:border-gray-800">
          © 2025 MindVault. Built with ❤️ by the Fed Project Team.
        </footer>
      </div>
    </div>
  );
};

export default Home;
