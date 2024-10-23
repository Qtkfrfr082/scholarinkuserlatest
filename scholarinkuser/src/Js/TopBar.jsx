import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent shadow-md p-4 flex  sm:flex-row justify-between items-center">
      {/* Left Section: Profile Icon and Greeting */}
      <div className="flex items-center mb-2 sm:mb-0">
        <svg
          onClick={() => navigate('/Profile')}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
        <span className="ml-3 text-lg text-black">Hello, Alex</span>
      </div>

      {/* Right Section: Notification and Search Icons */}
      <div className="flex space-x-6">
        {/* Notification Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.5 18 12V8c0-3.866-2.239-7-5-7S8 4.134 8 8v4c0 1.5-.21 2.79-.595 3.595L6 17h5m4 0v1a2 2 0 11-4 0v-1m4 0H9"
          />
        </svg>

        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.175-5.8A7.125 7.125 0 1110.325 3.85a7.125 7.125 0 017.125 7.125z"
          />
        </svg>
      </div>
    </div>
  );
};

export default TopBar;
