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
  const [phoneNumber, setPhoneNumber] = useState('');
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
    setPhoneNumber('');
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
    setError('');
    e.preventDefault();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
        setLoading1(true);
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

 const handleWhatsappOtp = async (e) => {
  // e.preventDefault(); // Uncomment this if you're using a form submission
  setError('');
  setMessage('');

  if (!phoneNumber) {
    setError('Please enter your phone number before proceeding.');
    return;
  }
  
 
  let mobile_number = phoneNumber;

  try {
   

    // If OTP is not sent, proceed to send OTP
    console.log(resendOtp);
   if (!otpSent || resendOtp) {
  await axios.post(
    'https://car-history-dekho-backend-production.up.railway.app/api/user/whatsapp-login', // Endpoint to send OTP
    { mobile_number },
    { withCredentials: true }
  );

  setStep('whatsappOtp');
  setOtpSent(true); // Ensure this is set so you don't re-send accidentally
  // Reset the flag after sending
  setSecondsLeft(50);
  
  
  setResendEnabled(false);
  setMessage('OTP sent to your WhatsApp.');
}
else {
      // If OTP is already sent, proceed to verify OTP
       setLoading(true);
      await axios.post(
        'https://car-history-dekho-backend-production.up.railway.app/api/user/whatsapp-verify-otp',  // Endpoint to verify OTP
        { mobile_number, otp },
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

  const [otpSent, setOtpSent] = useState(false);
const [resendDisabled, setResendDisabled] = useState(false);

// Handle sending OTP
const handleSendWhatsappOtp = () => {
 
  const trimmedPhone = phoneNumber.trim();

  // Validate: not empty and must be 10 digits
  if (!/^\d{10}$/.test(trimmedPhone)) {
    setError('Please enter a valid 10-digit WhatsApp number.');
    return;
  }
handleWhatsappOtp();
  // Proceed if valid
  setOtpSent(true);
  // ...send OTP logic here
  startResendTimer(); // Start timer for Resend OTP button cooldown
};
const handleBackToWhatsappStart = () => {
  setOtpSent(false);       // so that Send OTP button appears again
  setOtp('');              // clear any typed OTP
  setResendDisabled(false);
  setLoading(false);
  // phoneNumber remains as-is so user can edit or re-enter it
};


// Handle verifying OTP
const handleVerifyWhatsappOtp = (e) => {
  e.preventDefault();
  handleWhatsappOtp();
  console.log('Verifying OTP:', otp);
  // Example API call to verify OTP can be placed here
};
let resendOtp =false;
// Handle OTP resend logic
const handleResendOtp = () => {
  // Add the logic to resend OTP (you can call an API here)
  //setOtpSent(false);
resendOtp=true;
  handleWhatsappOtp();
  resendOtp=false;
  startResendTimer(); // Reset the resend timer
};

// Timer for OTP resend
const startResendTimer = () => {
  setResendDisabled(true);
  setTimeout(() => {
    setResendDisabled(false); // Re-enable the resend button after 30 seconds
  }, 30000); // 30 seconds cooldown
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
          {step !== 'whatsappOtp' && (
 <>
  <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
 <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  readOnly={step === 'otp'}
  className={`w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
    step === 'otp' ? 'bg-gray-100 cursor-not-allowed' : ''
  }`}
  required
/>


</>

    
)}
 <div>
              
            </div>

            {/* Step: OTP method default */}
            {step === 'select' && (
              <div className="space-y-4">
                <button
                  onClick={handleEmailOtp}
                  className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all
"
                >
                  <img src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1747004045/email-opened-svgrepo-com_jhxw3v.svg" alt="Send Email OTP" className="h-5 w-5 mr-3 inline-block" />
                  Send Email OTP
                </button>

                <div className="flex items-center gap-3">
                  <span className="flex-grow h-px bg-gray-300"></span>
                  <span className="text-sm text-gray-500">OR</span>
                  <span className="flex-grow h-px bg-gray-300"></span>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 text-black bg-white border border-gray-600 rounded-lg hover:bg-gray-150 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <img src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746999003/google-icon_gukp9e.svg" alt="Google Login" className="h-5 w-5 mr-3 inline-block" />
                  {loading1 ?  (
  <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center justify-center space-y-8 p-4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md pointer-events-none w-full max-w-sm md:max-w-md lg:max-w-lg mt-32 md:mt-40">
      
      {/* Spinner Container */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Outer Spinner Circle */}
        <div className="absolute inset-0 border-[6px] md:border-[6px] border-t-transparent border-l-blue-500 border-r-blue-300 border-b-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="w-full text-lg md:text-xl font-semibold text-gray-800 text-center">
        <strong>Logging in... Please wait</strong>
      </p>

      {/* Brand Name */}
      <span className="text-blue-500 text-base font-medium">Car History Dekho</span>
    </div>
  </div>
)
: ('Continue with Google')}
                </button>



               <button
  onClick={() => {
    setError(null); // Reset the error
    setStep('whatsappOtp'); // Move to the next step
  }}
  className="w-full py-3 text-black bg-white border border-gray-600 rounded-lg hover:bg-gray-150 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
>
  <img
    src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746999003/whatsapp_yvxwny.png"
    alt="WhatsApp OTP"
    className="h-5 w-5 mr-3 inline-block"
  />
  Login with WhatsApp OTP
</button>

<button
  disabled
  className={`w-full py-3 rounded-lg font-semibold transition
    border-2 border-blue-600 bg-blue-100 text-blue-800 cursor-default`}
>
  Login with Email OTP
</button>

                <button
                  onClick={() => {setError(null); setStep('password')}}
                  className="w-full py-3 text-black bg-white border border-gray-600 rounded-lg hover:bg-gray-150 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <img src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1747004310/email-mail-web-svgrepo-com_sbmkk0.svg" alt="Email & Password" className="h-5 w-5 mr-3 inline-block" />
                  Login with Email & Password
                </button>
              </div>
            )}

            {/* WhatsApp OTP step */}
         {step === 'whatsappOtp' && (
          
  <div className="space-y-4">
    {/* Bold label closer to input */}
    <p className="text-sm font-semibold text-black mb-0">WhatsApp Number</p>

    {/* Phone number input */}
    <input
      type="text"
      placeholder="Enter WhatsApp number"
      
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      readOnly={otpSent}
      required
      className={`w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
        otpSent ? 'bg-gray-100 cursor-not-allowed' : ''
      }`}
    />

    {/* Send OTP button with more top margin */}
    {!otpSent && (
      <button
        type="button"
        onClick={handleSendWhatsappOtp}
        className="w-full mt-6 py-3 bg-gradient-to-r  from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
      >
        Send OTP
      </button>
    )}

    {/* OTP input and actions */}
    {otpSent && (
      <div className="space-y-4">
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
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition"
          onClick={handleVerifyWhatsappOtp}
        >
          {loading ?   (
  <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center justify-center space-y-8 p-4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md pointer-events-none w-full max-w-sm md:max-w-md lg:max-w-lg mt-32 md:mt-40">
      
      {/* Spinner Container */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Outer Spinner Circle */}
        <div className="absolute inset-0 border-[6px] md:border-[6px] border-t-transparent border-l-blue-500 border-r-blue-300 border-b-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="w-full text-lg md:text-xl font-semibold text-gray-800 text-center">
        <strong>Verifying OTP... Please wait</strong>
      </p>

      {/* Brand Name */}
      <span className="text-blue-500 text-base font-medium">Car History Dekho</span>
    </div>
  </div>
): ('Verify OTP')}
        </button>

        <p className="text-sm text-center mt-2">
          <button
            type="button"
            className="text-blue-600 disabled:text-gray-400"
            onClick={handleResendOtp}
            disabled={resendDisabled}
          >
            {resendDisabled ? 'Resend OTP in 30s' : 'Resend OTP'}
          </button>
        </p>

        {/* Back to WhatsApp input */}
        <p className="text-sm text-center">
          <button
            type="button"
            className="text-red-500 hover:underline"
            onClick={handleBackToWhatsappStart}
          >
            ← Back to Enter WhatsApp Number again
          </button>
        </p>
      </div>
    )}

    {/* Back to login methods */}
    {!otpSent && (
      <p className="text-sm text-center">
        <button
          type="button"
          className="text-red-500 hover:underline"
          onClick={resetStates}
        >
          ← Back to login methods
        </button>
      </p>
    )}
  </div>
)}






            {/* Email OTP step */}
          {step === 'otp' && (
  <div className="space-y-4">
    <form onSubmit={handleEmailOtp} className="space-y-4">
      
      {/* Info Message */}
      <span className="text-sm text-red-500">
        Sometimes OTP is delivered in the spam folder. Please check it also.
      </span>

      <input
        type="number"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <button
        type="submit"
        className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all"
      >
        {loading ? (
          <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center justify-center space-y-8 p-4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md pointer-events-none w-full max-w-sm md:max-w-md lg:max-w-lg mt-32 md:mt-40">
              
              {/* Spinner Container */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                {/* Outer Spinner Circle */}
                <div className="absolute inset-0 border-[6px] md:border-[6px] border-t-transparent border-l-blue-500 border-r-blue-300 border-b-transparent rounded-full animate-spin"></div>
              </div>

              {/* Loading Text */}
              <p className="w-full text-lg md:text-xl font-semibold text-gray-800 text-center">
                <strong>Verifying OTP... Please wait</strong>
              </p>

              {/* Brand Name */}
              <span className="text-blue-500 text-base font-medium">Car History Dekho</span>
            </div>
          </div>
        ) : ('Verify OTP')}
      </button>
    </form>

    <p className="text-sm text-center">
      <button
        type="button"
        className="text-red-500 hover:underline"
        onClick={resetStates}
      >
        ← Back to login methods
      </button>
    </p>
  </div>
)}


            {/* Password login */}
           
            
            {step === 'password' && (
  <div className="space-y-4">
    <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {loading ?  (
  <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center justify-center space-y-8 p-4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md pointer-events-none w-full max-w-sm md:max-w-md lg:max-w-lg mt-32 md:mt-40">
      
      {/* Spinner Container */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Outer Spinner Circle */}
        <div className="absolute inset-0 border-[6px] md:border-[6px] border-t-transparent border-l-blue-500 border-r-blue-300 border-b-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="w-full text-lg md:text-xl font-semibold text-gray-800 text-center">
        <strong>Logging in... Please wait</strong>
      </p>

      {/* Brand Name */}
      <span className="text-blue-500 text-base font-medium">Car History Dekho</span>
    </div>
  </div>
): ('Login with Email & Password')}
      </button>
    </form>
    
    {/* Back to login methods button, only shown when not OTP step */}
    <p className="text-sm text-center">
      <button
        type="button"
        className="text-red-500 hover:underline"
        onClick={resetStates}
      >
        ← Back to login methods
      </button>
    </p>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
