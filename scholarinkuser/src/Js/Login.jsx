import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import '../Css/Login.css'
import Logo from '../assets/Logo.png'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dummy login validation logic
    if (email === 'test@example.com' && password === 'password123') {
      alert('Login successful');
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container-login">
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
          
            <a href="./signup" className="signup-link">Sign up</a>  
         
        </p>
    </div>
  </div>
);
}

