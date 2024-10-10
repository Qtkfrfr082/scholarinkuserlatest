
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'
import ArrowImage from '../assets/Icons/arrow-right-.svg'
import { ChevronDown } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate(); // Hook for navigation
      
  const handleBackClick = () => {
        navigate('/'); // Redirects to login page
      };
  const handleNextClick = () => {
        navigate('/LastPage'); // Redirects to login page
      };
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [isYearLevOpen, setIsYearLevOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  
  const courses = [
    { id: 1, name: 'Introduction to React', category: 'Web Development' },
    { id: 2, name: 'Advanced JavaScript', category: 'Programming' },
    { id: 3, name: 'UI/UX Design Fundamentals', category: 'Design' },
    { id: 4, name: 'Node.js Basics', category: 'Backend Development' },
    { id: 5, name: 'Python for Beginners', category: 'Programming' },
    { id: 6, name: 'Data Science Essentials', category: 'Data Science' },
  ];
  const programs = [
    { id: 1, name: 'Introduction to React', category: 'Web Development' },
    { id: 2, name: 'Advanced JavaScript', category: 'Programming' },
    { id: 3, name: 'UI/UX Design Fundamentals', category: 'Design' },
    { id: 4, name: 'Node.js Basics', category: 'Backend Development' },
    { id: 5, name: 'Python for Beginners', category: 'Programming' },
    { id: 6, name: 'Data Science Essentials', category: 'Data Science' },
  ];
  const yearLevels = [
    { id: 1, name: 'Freshman' },
    { id: 2, name: 'Sophomore' },
    { id: 3, name: 'Junior' },
    { id: 4, name: 'Senior' },
  ];

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setIsOpen(false); 
    setIsProgramOpen(false); 
    setIsYearLevOpen(false); 
  };
  
  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setIsProgramOpen(false); 
    setIsOpen(false); 
    setIsYearLevOpen(false); 
  };
  
  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setIsYearLevOpen(false); 
    setIsOpen(false); 
    setIsProgramOpen(false); 
  };
  const toggleCourseDropdown = () => {
    setIsOpen(!isOpen);
    setIsProgramOpen(false); 
    setIsYearLevOpen(false); 
  };

  const toggleProgramDropdown = () => {
    setIsProgramOpen(!isProgramOpen);
    setIsOpen(false); // Close the course dropdown
    setIsYearLevOpen(false); // Close the year level dropdown
  };

  const toggleYearLevDropdown = () => {
    setIsYearLevOpen(!isYearLevOpen);
    setIsOpen(false); // Close the course dropdown
    setIsProgramOpen(false); // Close the program dropdown
  };

  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
      e.preventDefault();
    
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
            <img src={BackButton} alt="Back Button" className="back-button" />
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
          {/* Course Selection */}
          <div className="input-group">
            <button
              type="button"
              className="bg-[rgba(255,255,255,0.445)] text-gray-500 relative w-full shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 rounded-full sm:text-sm hover:border-emerald-600 p-3 border border-gray-300 text-base transition-all duration-200"
              onClick={toggleCourseDropdown}>

              <span className="block truncate">
                {selectedCourse ? selectedCourse.name : 'Course'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </button>

            {isOpen && (
              <div className="bg-white absolute z-10 ml-3.5 mt-1 w-80 max-h-60 py-1 text-base ring-1 ring-opacity-5 overflow-auto sm:text-sm rounded-md">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    className={`${
                      selectedCourse?.id === course.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-900'
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 w-full text-left hover:border-emerald-600 bg-transparent rounded-full`}
                    onClick={() => handleSelectCourse(course)}>

                    <div className="flex flex-col">
                      <span className="font-medium block truncate">{course.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Program Selection */}
          <div className="input-group mt-4">
            <button
              type="button"
              className="bg-[rgba(255,255,255,0.445)] text-gray-500 relative w-full shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 rounded-full sm:text-sm hover:border-emerald-600 p-3 border border-gray-300 text-base transition-all duration-200 "
              onClick={toggleProgramDropdown}>

              <span className="block truncate">
                {selectedProgram ? selectedProgram.name : 'Program'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </button>
            {isProgramOpen && (
              <div className="bg-white absolute z-10 ml-2 mt-1 w-80 max-h-60 py-1 text-base ring-1 ring-opacity-5 overflow-auto sm:text-sm rounded-md">
                {programs.map((program) => (
                  <button
                    key={program.id}
                    className={`${
                      selectedProgram?.id === program.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-900'
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 w-full text-left hover:border-emerald-600 bg-transparent rounded-full`}
                    onClick={() => handleSelectProgram(program)}>

                    <div className="flex flex-col">
                      <span className="font-medium block truncate">{program.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Level Selection */}
          <div className="input-group mt-4">
            <button
              type="button"
              className="bg-[rgba(255,255,255,0.445)] text-gray-500 relative w-full shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 rounded-full sm:text-sm hover:border-emerald-600 p-3 border border-gray-300 text-base transition-all duration-200 "
              onClick={toggleYearLevDropdown}>

              <span className="block truncate">
                {selectedYear ? selectedYear.name : 'Year Level'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </button>
            {isYearLevOpen && (
              <div className="bg-white absolute z-10 ml-2 mt-1 w-80 max-h-60 py-1 text-base ring-1 ring-opacity-5 overflow-auto sm:text-sm rounded-md">
                {yearLevels.map((year) => (
                  <button
                    key={year.id}
                    className={`${
                      selectedYear?.id === year.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-900'
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 w-full text-left hover:border-emerald-600 bg-transparent rounded-full`}
                    onClick={() => handleSelectYear(year)}>

                    <div className="flex flex-col">
                      <span className="font-medium block truncate">{year.name}</span>
                    </div>
                  </button>
                ))}

              </div>
            )}
           
          </div>

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
