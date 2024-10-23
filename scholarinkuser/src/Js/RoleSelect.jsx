import { useState ,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'
import ArrowImage from '../assets/Icons/arrow-right-.svg'
import { AlertCircle } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

function SignUp() {
    const navigate = useNavigate(); // Hook for navigation
      
    const handleBackClick = () => {
          navigate('/'); // Redirects to login page
        };
   
        const [isRoleOpen, setIsRoleOpen] = useState(false);
        const [selectedRole, setSelectedRole] = useState(null);
        const [error, setError] = useState('');
     const roles = [
           
            { id: 2, name: 'Teacher' },
            { id: 3, name: 'Student' },
          ];
    
      const toggleRoleDropdown = () => {
        setIsRoleOpen(!isRoleOpen);
      };
    
      // Handle role selection
      const handleSelectRole = (role) => {
        setSelectedRole(role);
        setIsRoleOpen(false); // Close dropdown after selection
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedRole) {
            setError('Please select a role.');
            return;
          }
  
      // Reset error if all fields are filled
      setError('');
  
      // After successful form submission, navigate to the next page
      try {
        const response = await fetch('http://localhost:5456/role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roleId: selectedRole.id }),
        });

        const result = await response.json();

        if (response.ok) {
            navigate('/signup', { state: { roleId: selectedRole.id } });
        } else {
            setError(result.message);
        }
    } catch (error) {
        console.error('Error selecting role:', error);
        setError('An error occurred. Please try again.');
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
      <div className="signup-form-container">
     
      <div className="back-button-container">
          <button className="button-container" onClick={handleBackClick}>
            <img src={BackButton} alt="Back Button" className="back-button" />
          </button>
        </div>
      <p className="signup-title">Create Your Account</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group mt-4 z-10">

          <button
            type="button"
            className="bg-[rgba(255,255,255,0.445)] text-gray-500 relative w-full shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 rounded-full sm:text-sm hover:border-emerald-600 p-3 border border-gray-300 text-base transition-all duration-200"
            onClick={toggleRoleDropdown}
          >
            <span className="block truncate">
              {selectedRole ? selectedRole.name : 'Select a Role'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </button>
    
          {/* Dropdown menu */}
          {isRoleOpen && (
            <div className="bg-white absolute z-10 ml-2 mt-1 w-80 max-h-60 py-1 text-base ring-1 ring-opacity-5 overflow-auto sm:text-sm rounded-md">
              {roles.map((role) => (
                <button
                  key={role.id}
                  className={`${
                    selectedRole?.id === role.id
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-900'
                  } cursor-pointer select-none relative py-2 pl-3 pr-9 w-full text-left hover:border-emerald-600 bg-transparent rounded-full`}
                  onClick={() => handleSelectRole(role)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium block truncate">{role.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}   
           {error && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )} 
        </div>
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