
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'
import { ChevronDown } from 'lucide-react';

function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, name: 'Introduction to React', category: 'Web Development' },
    { id: 2, name: 'Advanced JavaScript', category: 'Programming' },
    { id: 3, name: 'UI/UX Design Fundamentals', category: 'Design' },
    { id: 4, name: 'Node.js Basics', category: 'Backend Development' },
    { id: 5, name: 'Python for Beginners', category: 'Programming' },
    { id: 6, name: 'Data Science Essentials', category: 'Data Science' },
  ];

  const handleSelect = (course) => {
    setSelectedCourse(course);
    setIsOpen(false);
  };

    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation
      
     const handleBackClick = () => {
          navigate('/login'); // Redirects to login page
        };
        
  
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
        <button
          type="button"
          className="bg-white text-black relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">
            {selectedCourse ? selectedCourse.name : 'Choose a course'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>
        {isOpen && (
          <div className="bg-white absolute z-10 mt-1 w-80 shadow-lg max-h-60 rounded-md py-1 text-base ring-1  ring-opacity-5 overflow-auto focus:outline-none sm:text-sm ">
            {courses.map((course) => (
              <button
                key={course.id}
                className={`${
                  selectedCourse?.id === course.id
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-900'
                } cursor-pointer select-none relative py-2 pl-3 pr-9 w-full text-left hover:bg-blue-50 bg-transparent`}
                onClick={() => handleSelect(course)}
              >
                <div className="flex flex-col">
                  <span className="font-medium block truncate ">{course.name}</span>
                  <span className="text-sm text-gray-500">{course.category}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
        
        <button type="submit" className="next-button">
          <p className="Next-text">Next</p>
          <span className="arrow">→</span>
        </button>
      </form>

     
    </div>
  </div>

    );
}
export default SignUp;
