import React, { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext.js';
import Navbar from '../components/navbar.js';
import { auth, provider, signInWithPopup } from "../firebase.js";
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('select'); // select | otp | password
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(50);
const [resendEnabled, setResendEnabled] = useState(false);
const [selectedMethod, setSelectedMethod] = useState('email-otp'); // default selected

  const navigate = useNavigate();

  const resetStates = () => {
    setError('');
    setMessage('');
    setPassword('');
    setOtp('');
    setStep('select');
  };
  useEffect(() => {
    let timer;
    if (step === 'otp' && !resendEnabled) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendEnabled]);
  

  const handleEmailOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    try {
      if (step !== 'otp') {
        setStep('otp');
        setSecondsLeft(50);
        setResendEnabled(false);
        await axios.post('http://localhost:5000/api/user/email-login', { email }, { withCredentials: true });
        setMessage('OTP sent to your email.');
      } else {
        setLoading(true);
        await axios.post('http://localhost:5000/api/user/verify-otp', { email, otp }, { withCredentials: true });
        setLoading(false);
        setMessage('Logged in successfully!');
        navigate('/Dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };
  
  

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
  
    try {
      await axios.post(
        'http://localhost:5000/api/user/login-or-register',
        { email, password },
        { withCredentials: true }
      );
      setMessage('Logged in successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };
  

 
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
  
      await axios.post(
        "http://localhost:5000/api/user/google-login",
        {
          email: user.email,
          googleId: user.uid,
        },
        { withCredentials: true }
      );
  
      navigate("/Dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed");
    }
  };
  
  
  
  
  return (
    <div>
      <Navbar />
      <div className=" flex flex-col  lg:flex-row">
        {/* Left side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-100 w-1/2 px-10 relative">
         
          <h1 className="text-3xl font-bold  mb-3 mt-3 text-center text-blue-700">Welcome to Car History Dekho</h1>
          <img
            src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554424/WhatsApp_Image_2025-05-06_at_23.27.24_44d5ba8c_xqvjzz.jpg"
            alt="Login Banner"
            className="w-full  lg:scale-[1.00] rounded-lg shadow-lg"
          />
          
        </div>

        {/* Right side form */}
        <div className="flex-1 flex justify-center items-center  bg-white px-4 py-2">
        <div className="w-full mt-0 max-w-md">
            <div className="lg:hidden  mb-4">
              <img
                src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554424/WhatsApp_Image_2025-05-06_at_23.27.24_44d5ba8c_xqvjzz.jpg"
                alt="Mobile Banner"
                className="w-full h-[40vh] shadow object-cover scale-[1.07]"
              />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Sign In or Sign Up</h2>
            {error && <p className="text-red-500 text-center mb-2">{error}</p>}
            {message && <p className="text-green-500 text-center mb-2">{message}</p>}

            {/* Always show email input */}
            <div className="mb-4">
              <label className="block text-md mb-0 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Select Login Method */}
            {step === 'select' && (
                <div><div className="space-y-4 ">
              <button
                  onClick={handleEmailOtp}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                 Send OTP
                </button>
                <div className="flex items-center my-6">
  <span className="flex-grow h-px bg-gray-300"></span>
  <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
  <span className="flex-grow h-px bg-gray-300"></span>
  
</div>

                </div>
                <div className="space-y-4 mt-6">
                <button
  onClick={() => setSelectedMethod('email-otp')}
  className={`w-full py-3 rounded-lg transition font-semibold
    ${selectedMethod === 'email-otp' 
      ? 'border-2 border-blue-600 bg-blue-100 text-blue-800' 
      : 'bg-white text-black hover:bg-blue-100 border'
    }`}
>
  Login with Email OTP
</button>

                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Login / Signup with Google
                </button>
                <button
                  onClick={() => setStep('password')}
                  className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                >
                  Login / Signup with Email & Password
                </button>
                
              </div>
              
              </div>
              
            )}

            {/* Email OTP Step */}
            {step === 'otp' && (
  <form onSubmit={handleEmailOtp} className="space-y-4 mt-4">
    <p className="text-sm text-gray-700">OTP sent to: <strong>{email}</strong></p>
    <label className="block text-sm font-medium">Enter OTP</label>
    <input
      type="number"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      required
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {loading ? 'Verifying...' : 'Verify OTP'}
    </button>

    {/* Resend OTP */}
    <div className="text-center mt-2">
      {!resendEnabled ? (
        <p className="text-sm text-gray-500">Resend OTP in {secondsLeft}s</p>
      ) : (
        <button
          type="button"
          onClick={() => {
            setSecondsLeft(50);
            setResendEnabled(false);
            axios.post('http://localhost:5000/api/login/email-login', { email });
            setMessage('OTP resent to your email.');
          }}
          className="text-blue-500 hover:underline text-sm"
        >
          Resend OTP
        </button>
      )}
    </div>

    <p className="text-sm text-center mt-2">
      <button onClick={resetStates} type="button" className="text-blue-500 hover:underline">Back</button>
    </p>
  </form>
)}


            {/* Email & Password */}
            {step === 'password' && (
              <form onSubmit={handleEmailPasswordLogin} className="space-y-4 mt-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="text-sm text-center mt-2">
                  <button onClick={resetStates} type="button" className="text-blue-500 hover:underline">Back</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
