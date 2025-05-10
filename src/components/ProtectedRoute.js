// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('token'); // Adjust the cookie name as per your backend
  console.log('token',token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
