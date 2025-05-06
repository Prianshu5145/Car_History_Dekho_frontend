import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'; // Adjust the import based on your context path

const Logout = () => {
  const { logout } = useAuth(); // Access logout function from your AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        // Call the logout function to handle any necessary state updates
        navigate('/'); // Redirect to login page after successful logout
      } catch (error) {
        console.error('Failed to log out:', error);
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="mt-4">You will be redirected shortly.</p>
    </div>
  );
};

export default Logout;
