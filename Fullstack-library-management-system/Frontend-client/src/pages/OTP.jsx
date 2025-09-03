import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification({ email, otp }));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/");
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE - OTP Form */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        {/* Back Button */}
        <Link
          to="/register"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black text-white px-5 py-2 rounded-full font-bold hover:bg-gray-800 transition duration-300 z-10"
        >
          Back
        </Link>

        <div className="max-w-sm w-full">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="logo" className="h-24 w-auto" />
          </div>

          <h1 className="text-4xl font-medium text-center mb-6">
            Check your Mail-box
          </h1>
          <p className="text-gray-800 text-center mb-8">
            Please enter the OTP to proceed
          </p>

          <form onSubmit={handleOtpVerification} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border border-black rounded-md focus:outline-none text-center"
              required
            />
            <button
              type="submit"
              className="w-full border-2 border-black bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "VERIFY"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - Sign Up Info */}
      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center h-[400px] flex flex-col items-center justify-center">
          <div className="flex justify-center mb-8">
            <img src={logo_with_title} alt="logo" className="h-44 w-auto" />
          </div>
          <p className="text-white mb-5">New to our platform? Sign up now.</p>
          <Link
            to="/register"
            className="border-2 w-full border-white bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTP;
