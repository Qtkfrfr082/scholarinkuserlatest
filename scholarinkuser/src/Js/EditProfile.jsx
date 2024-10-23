import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/EditProfile.css';
import BackButton from '../assets/Icons/back-square.svg';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    Fname: '',
    Mname: '',
    Lname: '',
    Email: '',
    College: '',
    Program: '',
    YearLevel: '',
    Profile: null // This will hold the profile picture file or URL
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId'); // Retrieve the UserId from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5456/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
        setFormData({
          Fname: userData.Fname || '',
          Mname: userData.Mname || '',
          Lname: userData.Lname || '',
          Email: userData.Email || '',
          College: userData.College || '',
          Program: userData.Program || '',
          YearLevel: userData.YearLevel || '',
          Profile: userData.Profile || null
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      Profile: e.target.files[0] // Capture the profile picture file
    });
  };

  const handleBackClick = () => {
    navigate('/Profile'); // Redirects to the profile page
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for file upload
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch(`http://localhost:5456/user/${userId}/edit`, {
        method: 'PUT',
        body: form
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      navigate('/Profile'); // Redirect to profile page after update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    
    <div className="container-edit-profile">
      <div className="bg-transparent shadow-md p-4 flex  sm:flex-row justify-between items-center">
        <div className="Back-button-container">
          <button className="button-container" onClick={handleBackClick}>
            <img src={BackButton} alt="Back Button" className="Back-button" />
          </button>
        </div>
        <div className="Edit-text-Container">Edit Profile</div>
      </div>
 
      <div className="form-container-edit">
        {user ? (
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="user-edit-info-top">
              <div className="image-upload">
                <label htmlFor="profileImage">
                  {formData.Profile instanceof File ? (
                    <img
                      src={URL.createObjectURL(formData.Profile)}
                      alt="User"
                      className="user-profile-image"
                    />
                  ) : (
                    user.Profile && <img src={user.Profile} alt="Profile" className="user-profile-image"/> 
                  )}
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="Profile"
                  onChange={handleFileChange}
                  accept="image/*"
                 
                /><h2>Account Information</h2>
              </div>
              </div>
              <div className='user-info-bottom'>
              <div className="user-details">
                <p>First Name</p>
                <input
                  type="text"
                  name="Fname"
                  value={formData.Fname}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                />
                 <p>Middle Name</p>
                <input
                  type="text"
                  name="Mname"
                  value={formData.Mname}
                  onChange={handleInputChange}
                  placeholder="Middle Name"
                />
                 <p>Last Name</p>
                <input
                  type="text"
                  name="Lname"
                  value={formData.Lname}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                />
                <p>College</p>
              <input
                type="text"
                name="College"
                value={formData.College}
                onChange={handleInputChange}
                placeholder="College"
              />
              <p>Program</p>
              <input
                type="text"
                name="Program"
                value={formData.Program}
                onChange={handleInputChange}
                placeholder="Program"
              />
              <p>Year Level</p>
              <input
                type="text"
                name="YearLevel"
                value={formData.YearLevel}
                onChange={handleInputChange}
                placeholder="Year Level"
              />
            </div></div>
<div className="save-button-container">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            </div>
           
          </form>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
