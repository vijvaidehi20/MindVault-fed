import { useState } from 'react';
import './authmodal.css';

interface AuthModalProps {
  onClose: () => void;
  initialView: 'login' | 'signup'; // New prop to specify the initial view
}

export default function AuthModal({ onClose, initialView }: AuthModalProps) {
  // Use the initialView prop to set the starting state
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logging in...');
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Signing up...');
    onClose();
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-container">
        <button onClick={onClose} className="auth-modal-close-btn">&times;</button>
        
        {isLoginView ? (
          // Login View
          <>
            <h2 className="auth-modal-title">Welcome Back!</h2>
            <p className="auth-modal-subtitle">Log in to continue your journey.</p>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="auth-input-group">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" className="auth-input" required />
              </div>
              <div className="auth-input-group">
                <label htmlFor="login-password">Password</label>
                <input type="password" id="login-password" className="auth-input" required />
              </div>
              <button type="submit" className="auth-btn">Login</button>
            </form>
            <p className="auth-link-text">
              Don't have an account? <span onClick={toggleView} className="auth-link">Sign Up</span>
            </p>
          </>
        ) : (
          // Signup View
          <>
            <h2 className="auth-modal-title">Join MindVault!</h2>
            <p className="auth-modal-subtitle">Create an account to get started.</p>
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <div className="auth-input-group">
                <label htmlFor="signup-name">Name</label>
                <input type="text" id="signup-name" className="auth-input" required />
              </div>
              <div className="auth-input-group">
                <label htmlFor="signup-email">Email</label>
                <input type="email" id="signup-email" className="auth-input" required />
              </div>
              <div className="auth-input-group">
                <label htmlFor="signup-password">Password</label>
                <input type="password" id="signup-password" className="auth-input" required />
              </div>
              <button type="submit" className="auth-btn">Sign Up</button>
            </form>
            <p className="auth-link-text">
              Already have an account? <span onClick={toggleView} className="auth-link">Log In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}