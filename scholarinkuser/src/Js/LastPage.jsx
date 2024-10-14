import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'
import ArrowImage from '../assets/Icons/arrow-right-.svg'
import { AlertCircle } from 'lucide-react';
function SignUp() {
      
<<<<<<< Updated upstream
   
=======
      const handleBackClick = () => {
            navigate('/nextSignUp'); // Redirects to the previous page
        };
     
>>>>>>> Stashed changes
        const [Email, setEmail] = useState('');
        const [Password, setPassword] = useState('');
        const [ConfirmPass, setConfirmPass] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const [error, setError] = useState('');
        
        const handleChange = (e) => {
            const { name, value } = e.target;
        if (name === 'Password') {
            setPassword(value);
            // Check if confirm password matches
            if (ConfirmPass && value !== ConfirmPass) {
              setErrorMessage('Passwords do not match');
            } else {
              setErrorMessage('');
            }
          } else if (name === 'ConfirmPass') {
            setConfirmPass(value);
            // Check if password matches confirm password
            if (Password && value !== Password) {
              setErrorMessage('Passwords do not match');
            } else {
              setErrorMessage('');
            }
          }
        };
  const navigate = useNavigate(); // Hook for navigation
      
  const handleBackClick = () => {
          navigate('/signup'); // Redirects to back
        };
  const handleNextClick = () => {
          navigate('/'); // Redirects to login page
        };
  const handleSubmit = (e) => {
      e.preventDefault();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@dyci\.edu\.ph$/;

      if (!emailPattern.test(Email)) {
        setErrorMessage('Please enter a valid email address in the format: example@dyci.edu.ph');
        return; // Stop form submission
      }
    
      // Proceed with submission if no errors
      console.log('Form submitted');
    };
  
return (
    <div className="signup-container-login">
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
  <div className="signup-form-container">
   
    <div className="back-button-container">

  <button className="button-container" onClick={handleBackClick}>
    <img 
      src={BackButton} 
      alt="Back Button" 
      className="back-button"
    />
  </button>
</div>
    {error && (
      <div className="error-alert">
        <AlertCircle className="error-icon" />
        <span>{error}</span>
      </div>
    )}
    <p className="signup-title">Create Your Account</p>
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <input
        type="email"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field" 
        required
        pattern="[a-zA-Z0-9._%+-]+@dyci\.edu\.ph" // Use single backslash
      />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Password"
          name="Password"
          onChange={handleChange}
          value={Password}
          
          className="input-field"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Confirm Password"
          name="ConfirmPass"
          value={ConfirmPass}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>
      {errorMessage && (
            <div className="error-alert">
              <AlertCircle className="error-icon" />
              <span>{errorMessage}</span>
            </div>
          )}

      <button type="submit" className="next-button" onClick={handleNextClick}>
          <p className="Next-text">Next</p>
          <span className="arrow">
            <img src={ArrowImage} alt="ArrowNext" className="arrow-image" /></span>
        </button>
     
    </form>

   
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

        export default SignUp;