import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import '../Css/Login.css'
import Logo from '../assets/Logo.png'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSignClick = () => {
    navigate('/signup'); // Redirects to login page
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dummy login validation logic
    if (email === 'test@dyci.edu.ph' && password === 'password123') {
      navigate('/Home'); // Redirects to login page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container-login">
        <div className="svg-container">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <defs>
                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" style={{ stopColor: '#9DC284', stopOpacity: 1 }} />
                   <stop offset="100%" style={{ stopColor: '#96DEDA', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
              <path
                fill="url(#gradient)"
                 d="M43.3,-42C52.3,-34.2,53.3,-17.1,55.6,2.4C58,21.8,61.7,43.6,52.7,50C43.6,56.4,21.8,47.4,3.1,44.3C-15.6,41.1,-31.1,43.9,-40.9,37.5C-50.7,31.1,-54.7,15.6,-55.5,-0.8C-56.3,-17.2,-54,-34.4,-44.2,-42.2C-34.4,-50,-17.2,-48.4,-0.1,-48.3C17.1,-48.3,34.2,-49.8,43.3,-42Z"
                  transform="translate(100 100)"
             />
          </svg>
        </div>
    <div className="form-container">
      <div className="logo-wrapper">
        <div className="logo-container">
        <img 
              src={Logo} 
              alt="Company Logo" 
              className="logo-image"
            />
        </div>
      </div>

      <h2 className="signin-title">Sign In</h2>

      {error && (
        <div className="error-alert">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="example@edu.dyci.ph"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
        <p className="signup-text">
        Don't have an account?{' '}
          
            <a className="signup-link" onClick={handleSignClick}>Sign up</a>  
         
        </p>
    </div>
    <div className="svg-container-2">
   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9DC284', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#96DEDA', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M43.3,-42C52.3,-34.2,53.3,-17.1,55.6,2.4C58,21.8,61.7,43.6,52.7,50C43.6,56.4,21.8,47.4,3.1,44.3C-15.6,41.1,-31.1,43.9,-40.9,37.5C-50.7,31.1,-54.7,15.6,-55.5,-0.8C-56.3,-17.2,-54,-34.4,-44.2,-42.2C-34.4,-50,-17.2,-48.4,-0.1,-48.3C17.1,-48.3,34.2,-49.8,43.3,-42Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  </div>
);
}

