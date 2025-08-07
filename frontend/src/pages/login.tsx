import './authmodal.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
    alert('Logging in...');
  };

  const handleClose = () => {
    navigate('/upload-notes'); // Redirect to upload notes page after login
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-container">
        <button onClick={handleClose} className="auth-modal-close-btn">&times;</button>
        <div className="auth-modal-content">
          <h2 className="auth-modal-title">Welcome Back!</h2>
          <p className="auth-modal-message">Sign in to unlock all features.</p>
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <input type="email" placeholder="Email" className="auth-input" required />
            <input type="password" placeholder="Password" className="auth-input" required />
            <button type="submit" className="auth-submit-btn">Login</button>
          </form>
          <p className="auth-switch-text">
            Don't have an account? <a href="/signup" className="auth-link">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}