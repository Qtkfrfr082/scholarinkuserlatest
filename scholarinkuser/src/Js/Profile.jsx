import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Profile.css';
import EditBtn from '../assets/Icons/edit.svg';
import BackButton from '../assets/Icons/back-square.svg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    const userId = localStorage.getItem('UserId'); // Retrieve UserId from localStorage

    if (userId) {
      fetch(`http://localhost:5456/user/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate('/Home'); // Redirects to the previous page
  };
  const handleEditClick = () => {
    navigate('/ProfileEdit'); // Redirects to the previous page
  };
  
  return (
    <div className="container-profile">
      <div className="bg-transparent shadow-md p-4 flex  sm:flex-row justify-between items-center">
        <div className="Back-button-container">
          <button className="button-container" onClick={handleBackClick}>
            <img src={BackButton} alt="Back Button" className="Back-button" />
          </button>
        </div>
        
        <div className="Profile-text-Container">Profile</div>
        <div className="edit-button-container">
          <button className="edit-container" onClick={handleEditClick}>
            <img src={EditBtn} alt="Edit Button" className="edit-button" />
          </button>
        </div>
      </div>
      <div className="form-container-profile"> 
      {user ? (
  <div className="user-info-list">
    <div className='user-info-top'>
    {user.Profile && <img src={user.Profile} alt="Profile" className="user-profile-image"/> }
      <div className="user-details">
        <p>{user.Fname} {user.Mname} {user.Lname}</p>
        <p>{user.StudentNum}</p>
      </div>
    </div>
    <h2>Account Information</h2>
    <div className='user-info-bottom'>
      <p>{user.College}</p>
      <p>{user.Program}</p>
      <p>{user.YearLevel}</p>
    </div> 
    <div className="logout-button-container">
    <button type="submit" className="logout-button" onClick={() => navigate('/')}>
        Logout
      </button>
      </div>
  </div>
 
) : (
  <p>Loading user information...</p>
)}

</div>
      
    </div>
  );
};

export default Profile;
