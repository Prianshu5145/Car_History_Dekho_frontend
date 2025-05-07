// logout.js



 const Logout = async () => {
  try {
    // Make the request to the backend to clear the token cookie
    const response = await fetch('http://localhost:5000/api/user/logout', {
      method: 'POST', // or 'GET' based on your backend
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // You can log the message or show a notification
      
      // Redirect to login page or home page after logging out
      window.location.href = '/Dashboard'; // or use useHistory to navigate in React
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default Logout;
