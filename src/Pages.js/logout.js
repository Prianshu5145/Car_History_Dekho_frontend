import axios from 'axios';

const Logout = async () => {
  try {
    const response = await axios.post(
      'https://car-history-dekho-backend-production.up.railway.app/api/user/logout',
      {},
      { withCredentials: true } // Important for sending cookies
    );

    if (response.status === 200) {
      window.location.href = '/login'; // Redirect after logout
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default Logout;
