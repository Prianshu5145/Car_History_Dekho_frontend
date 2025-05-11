import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar.js';
import { auth, provider, signInWithPopup } from "../firebase.js";
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('select'); // default to email OTP
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(50);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const navigate = useNavigate();

  const resetStates = () => {
    setError('');
    setMessage('');
    setPassword('');
    setOtp('');
    setStep('select');
    setSecondsLeft(50);
    setResendEnabled(false);
  };

  useEffect(() => {
    let timer;
    if (step === 'otp' && !resendEnabled) {
      timer = setInterval(() => {
        setSecondsLeft(prev => {
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

    if (!email) {
      setError('Please enter your email before proceeding.');
      return;
    }

    try {
      if (step !== 'otp') {
        setStep('otp');
        setSecondsLeft(50);
        setResendEnabled(false);
        await axios.post(
          'https://car-history-dekho-backend-production.up.railway.app/api/user/email-login',
          { email },
          { withCredentials: true }
        );
        setMessage('OTP sent to your email.');
      } else {
        setLoading(true);
        await axios.post(
          'https://car-history-dekho-backend-production.up.railway.app/api/user/verify-otp',
          { email, otp },
          { withCredentials: true }
        );
        setLoading(false);
        setMessage('Logged in successfully!');
        navigate('/Dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post(
        'https://car-history-dekho-backend-production.up.railway.app/api/user/login-or-register',
        { email, password },
        { withCredentials: true }
      );
      setMessage('Logged in successfully!');
      navigate('/Dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      await axios.post(
        'https://car-history-dekho-backend-production.up.railway.app/api/user/google-login',
        { email: user.email, googleId: user.uid },
        { withCredentials: true }
      );
      navigate('/Dashboard');
    } catch {
      alert('Google login failed');
    } finally {
      setLoading1(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* Left side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-200 w-1/2 px-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center leading-snug">
            Welcome to <br /> Car History Dekho
          </h1>
          <img
            src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554424/WhatsApp_Image_2025-05-06_at_23.27.24_44d5ba8c_xqvjzz.jpg"
            alt="Banner"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>

        {/* Right side login */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-gray-800">Login / Sign Up</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-green-600 text-center">{message}</p>}

            {/* Email input */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Step: OTP method default */}
            {step === 'select' && (
              <div className="space-y-4">
                <button
                  onClick={handleEmailOtp}
                  className="flex items-center justify-center gap-3 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  <FaEnvelope className="text-lg" />
                  Send Email OTP
                </button>

                <div className="flex items-center gap-3">
                  <span className="flex-grow h-px bg-gray-300"></span>
                  <span className="text-sm text-gray-500">OR</span>
                  <span className="flex-grow h-px bg-gray-300"></span>
                </div>


                 


                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-3 w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <FaGoogle className="text-lg" />
                  {loading1 ? 'Logging in...' : 'Continue with Google'}
                </button>
 <button
  disabled
  className={`w-full py-3 rounded-lg font-semibold transition
    ${'border-2 border-blue-600 bg-blue-100 text-blue-800 cursor-default'}
  `}
>
  Login with Email OTP
</button>
                <button
                  onClick={() => setStep('password')}
                  className="flex items-center justify-center gap-3 w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
                >
                  <FaLock className="text-lg" />
                  Login with Email & Password
                </button>
              </div>
            )}

            {/* OTP step */}
            {step === 'otp' && (
              <form onSubmit={handleEmailOtp} className="space-y-4">
                <p className="text-sm text-gray-600">
                  OTP sent to <strong>{email}</strong>
                </p>
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

                <div className="text-center">
                  {!resendEnabled ? (
                    <p className="text-sm text-gray-500">Resend OTP in {secondsLeft}s</p>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        setSecondsLeft(50);
                        setResendEnabled(false);
                        await axios.post('https://car-history-dekho-backend-production.up.railway.app/api/user/email-login', { email });
                        setMessage('OTP resent to your email.');
                      }}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <p className="text-sm text-center">
                  <button type="button" onClick={resetStates} className="text-blue-500 hover:underline">
                    Back
                  </button>
                </p>
              </form>
            )}

            {/* Password step */}
            {step === 'password' && (
              <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter password"
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

                <p className="text-sm text-center">
                  <button type="button" onClick={resetStates} className="text-blue-500 hover:underline">
                    Back
                  </button>
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
