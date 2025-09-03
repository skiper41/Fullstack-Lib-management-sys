import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword, resetAuthSlice } from "../store/slices/authSlice";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ password , confirmPassword}, token));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/login"); // redirect to login after reset
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate]);

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
          Remembered your password?{" "}
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
              Reset Password
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;
