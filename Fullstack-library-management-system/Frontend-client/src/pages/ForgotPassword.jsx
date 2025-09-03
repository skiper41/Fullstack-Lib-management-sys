import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgetPassword, resetAuthSlice } from "../store/slices/authSlice";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      setEmail(""); // clear input
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch]);

  return (
    <motion.div
      className="flex flex-col md:flex-row h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side */}
      <motion.div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-8 rounded-tr-[120px] rounded-br-[120px]">
        <img src={logo_with_title} alt="logo" className="mb-10 h-36 w-auto" />
        <p className="text-gray-300 text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-white font-bold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>

      {/* Right side */}
      <motion.div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img src={logo} alt="logo" className="h-20 w-auto" />
            <h3 className="font-semibold text-3xl text-center">
              Forgot Password
            </h3>
          </div>

          {message ? (
            <p className="text-center text-green-600 text-sm mb-6">
              Check your inbox for the password reset link.
            </p>
          ) : (
            <p className="text-gray-700 text-center mb-6 text-sm">
              Enter your email to receive a password reset link.
            </p>
          )}

          {!message && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <p className="text-center mt-4 text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
