const Logout = async () => {
  try {
    const response = await fetch('https://car-history-dekho-backend-production.up.railway.app/api/user/logout', {
      method: 'POST',
      credentials: 'include', // Important to send cookies
    });

    if (response.ok) {
      const data = await response.json();
     
      window.location.href = '/login'; // Redirect after logout
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default Logout;
