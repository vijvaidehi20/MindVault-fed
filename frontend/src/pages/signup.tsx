import './authmodal.css';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your signup logic here
    alert('Signing up...');
  };
  
  const handleClose = () => {
    navigate('/upload-notes'); // Redirect to upload notes page after signup
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-container">
        <button onClick={handleClose} className="auth-modal-close-btn">&times;</button>
        <div className="auth-modal-content">
          <h2 className="auth-modal-title">Join MindVault</h2>
          <p className="auth-modal-message">Create your account and start summarizing.</p>
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <input type="text" placeholder="Full Name" className="auth-input" required />
            <input type="email" placeholder="Email" className="auth-input" required />
            <input type="password" placeholder="Password" className="auth-input" required />
            <button type="submit" className="auth-submit-btn">Sign Up</button>
          </form>
          <p className="auth-switch-text">
            Already have an account? <a href="/login" className="auth-link">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}