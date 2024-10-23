import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'
import ArrowImage from '../assets/Icons/arrow-right-.svg'
import { AlertCircle } from 'lucide-react';
function SignUp() {
      
     const handleBackClick = () => {
            navigate('/nextSignUp'); // Redirects to the previous page
        };
        const [Email, setEmail] = useState('');
        const [Password, setPassword] = useState('');
        const [ConfirmPass, setConfirmPass] = useState('');
        const [error, setError] = useState('');

        const navigate = useNavigate(); // Hook for navigation
        const handlePasswordChange = (e) => {
          const { name, value } = e.target;
  
          if (name === 'Password') {
              setPassword(value);
  
              // Check if confirm password matches dynamically
              if (ConfirmPass && value !== ConfirmPass) {
                  setError('Passwords do not match');
              } else {
                  setError(''); // Clear error if they match
              }
          } else if (name === 'ConfirmPass') {
              setConfirmPass(value);
  
              // Check if password matches confirm password
              if (Password && value !== Password) {
                  setError('Passwords do not match');
              } else {
                  setError(''); // Clear error if they match
              }
          }
      };
      const handleSubmit = async (e) => {
            e.preventDefault();
    
            // Check if fields are empty
            if (!Email || !Password || !ConfirmPass) {
                setError('All fields are required.');
                return;
            }
            const emailPattern = /^[a-zA-Z0-9._%+-]+@dyci\.edu\.ph$/;
            if (!emailPattern.test(Email)) {
                setError('Please enter a valid email address in the format: example@dyci.edu.ph');
                return; // Stop form submission
            }
            // Check if passwords match
            if (Password !== ConfirmPass) {
                setError('Passwords do not match');
                return;
            }
           
    
            // Reset error if form is valid
            setError('');
            const userData = {
              Email,
              Password,
          };
  
          // Send data to the server
          try {
              const response = await fetch('http://localhost:5456/pass-user', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
              });
  
              const data = await response.json();
              if (response.ok) {
                  console.log(data.message); // Success message from the server
                  // Reset form fields after successful submission
                  setEmail('');
                  setPassword('');
                  setConfirmPass('');
                 
  
                  // Navigate to another page
                  navigate('/');
              } else {
                  setError(data.message || 'Failed to create user.');
              }
          } catch (error) {
              setError('An error occurred while submitting the form.');
              console.error('Error:', error);
          }
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
    <p className="signup-title">Create Your Account</p>
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <input
        type="email"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field" 
      />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          name="Password"
          onChange={handlePasswordChange}
          value={Password}
          
          className="input-field"
         
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Confirm Password"
          name="ConfirmPass"
          value={ConfirmPass}
          onChange={handlePasswordChange}
          className="input-field"
        
        />
      </div>
      {error && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

      <button type="submit" className="next-button">
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