import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('car-history-dekho-backend-production.up.railway.app/api/user/profile', {
      withCredentials: true,
    })
    .then(res => setEmail(res.data.email))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-sm shadow-xl rounded-2xl p-6 text-center border border-blue-100">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <UserCircle2 size={64} className="text-blue-600" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm mb-6">Manage your account info here.</p>

        <div className="text-left space-y-2">
          <div>
            <label className="text-gray-500 text-xs">Email</label>
            <div className="text-gray-800 font-medium bg-gray-100 px-3 py-2 rounded-lg">{email}</div>
          </div>
        </div>

        <div className="mt-6">
        <button
  onClick={() => navigate('/Dashboard')}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
>
  Back to Dashboard
</button>

        </div>
      </div>
    </div>
  );
};

export default Profile;
