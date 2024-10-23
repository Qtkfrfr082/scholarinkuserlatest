
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Signup.css'
import BackButton from '../assets/Icons/back-square.svg'
import ArrowImage from '../assets/Icons/arrow-right-.svg'
import { ChevronDown } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate(); // Hook for navigation
      
  const handleBackClick = () => {
        navigate('/signup'); // Redirects to login page
      };
  const handleNextClick = () => {
        navigate('/LastPage'); // Redirects to login page
      };
      const [isOpen, setIsOpen] = useState(false);
      const [isProgramOpen, setIsProgramOpen] = useState(false);
      const [isYearLevOpen, setIsYearLevOpen] = useState(false);
      const [selectedDepartment, setSelectedDepartment] = useState(null);
      const [selectedProgram, setSelectedProgram] = useState(null);
      const [selectedYear, setSelectedYear] = useState(null);
  
  const departments = [
    { id: 1, name: 'IT Department' },
    { id: 2, name: 'Engineering Department' },
    { id: 3, name: 'Business Department' },
  ];

  // Programs (Filtered based on department)
  const allPrograms = {
    1: [
      { id: 1, name: 'BS Information Technology' },
      { id: 2, name: 'BS Computer Science' },
    ],
    2: [
      { id: 3, name: 'BS Computer Engineering' },
      { id: 4, name: 'BS Electrical Engineering' },
    ],
    3: [
      { id: 5, name: 'BS Business Administration' },
      { id: 6, name: 'BS Accountancy' },
    ],
  };

  // Year levels
  const yearLevels = [
    { id: 1, name: '1st Year' },
    { id: 2, name: '2nd Year' },
    { id: 3, name: '3rd Year' },
    { id: 4, name: '4th Year' },
    { id: 5, name: '5th Year' }
  ];

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setSelectedProgram(null); // Reset the program when department changes
    setIsOpen(false);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setIsProgramOpen(false);
  };
  
  
  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setIsYearLevOpen(false);
  };

  const toggleDepartmentDropdown = () => {
    setIsOpen(!isOpen);
    setIsProgramOpen(false);
    setIsYearLevOpen(false);
  };

  const toggleProgramDropdown = () => {
    setIsProgramOpen(!isProgramOpen);
    setIsOpen(false);
    setIsYearLevOpen(false);
  };

  const toggleYearLevDropdown = () => {
    setIsYearLevOpen(!isYearLevOpen);
    setIsOpen(false);
    setIsProgramOpen(false);
  };

  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedDepartment || !selectedProgram || !selectedYear) {
        setError('All fields are required.');
        return;
      }

    // Reset error if all fields are filled
    setError('');

   

  // Send data to the server
  try {
    const response = await fetch('http://localhost:5456/department', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departmentId: selectedDepartment.name,
        programId: selectedProgram.name,
        yearId: selectedYear.name,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message); // Success message from the server
      // Navigate to the next page after successful submission
      navigate('/LastPage');
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
            <img src={BackButton} alt="Back Button" className="back-button" />
          </button>
        </div>
       
        <p className="signup-title">Create Your Account</p>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Course Selection */}
          <div className="input-group">
            <button
              type="button"
              className="bg-[rgba(255,255,255,0.445)] text-gray-500 relative w-full shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 rounded-full sm:text-sm hover:border-emerald-600 p-3 border border-gray-300 text-base transition-all duration-200"
              onClick={toggleDepartmentDropdown}>

              <span className="block truncate">
                  {selectedDepartment ? selectedDepartment.name : 'Department'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </button>

            {isOpen && (
              <div className="bg-white absolute z-10 ml-3.5 mt-1 w-80 max-h-60 py-1 text-base ring-1 ring-opacity-5 overflow-auto sm:text-sm rounded-md">
                {departments.map((department) => (
                  <button
                  key={department.id}
                    className={`${
                      selectedDepartment?.id === department.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-900'
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 w-full text-left hover:border-emerald-600 bg-transparent rounded-full`}
                    onClick={() => handleSelectDepartment(department)}>
                      
                    <div className="flex flex-col">
                      <span className="font-medium block truncate">{department.name}</span>
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
              onClick={toggleProgramDropdown}
              disabled={!selectedDepartment}>

              <span className="block truncate">
              {selectedProgram ? selectedProgram.name : 'Program'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </button>
            {isProgramOpen && selectedDepartment && (
              <div className="bg-white absolute z-10 ml-2 mt-1 w-80 max-h-60 py-1 text-base ring-1 ring-opacity-5 overflow-auto sm:text-sm rounded-md">
                {allPrograms[selectedDepartment.id].map((program) => (
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
          {error && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}
          <button type="submit" className="next-button" onSubmit={handleNextClick}>
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