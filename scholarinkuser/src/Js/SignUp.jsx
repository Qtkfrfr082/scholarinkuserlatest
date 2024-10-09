
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'

function SignUp() {
    const navigate = useNavigate(); // Hook for navigation
      
     const handleBackClick = () => {
          navigate('/'); // Redirects to login page
        };
      const handleNextClick = () => {
          navigate('/nextSignUp'); // Redirects to login page
        };
    const [studentNum, setStudentNum] = useState('');
    const [Lname, setLname] = useState('');
    const [Fname, setFname] = useState('');
    const [Mname, setMname] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
  };
return (
    <div className="signup-container-login">
    
    <div className="signup-form-container">
      {/* Logo/Avatar */}
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
            type="text"
            placeholder="Student Number"
            value={studentNum}
            onChange={(e) => setStudentNum(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Last Name"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="First Name"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Middle Name"
            value={Mname}
            onChange={(e) => setMname(e.target.value)}
            className="input-field"
            required
          />
        </div>
        
        <button type="submit" className="next-button" onClick={handleNextClick}>
          <p className="Next-text">Next</p>
          <span className="arrow">→</span>
        </button>
      </form>

     
    </div>
  </div>

    );
}
export default SignUp;
