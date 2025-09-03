import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(login(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/"); // Redirect after successful login
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
    <motion.div
  className="flex flex-col md:flex-row h-screen bg-gray-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* LEFT SIDE (FORM) */}
  <div className="w-full md:w-1/2 flex items-center justify-center p-8">
    <motion.div
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo and Heading */}
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <img src={logo} alt="logo" className="h-20 w-auto" />
        <h3 className="font-bold text-3xl text-center text-gray-900">Welcome Back</h3>
      </div>

      {/* Info Text */}
      <p className="text-gray-700 text-center mb-6">
        Enter your email and password to login.
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Forgot Password */}
      <p className="text-center mt-4">
        <Link
          to="/forgot-password"
          className="text-black font-semibold hover:underline"
        >
          Forgot Password?
        </Link>
      </p>
    </motion.div>
  </div>

  {/* RIGHT SIDE (BLACK DECORATIVE) */}
  <motion.div
    className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-8 
      rounded-tl-[120px] rounded-bl-[120px] relative"
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center z-10 w-full">
      <img
        src={logo_with_title}
        alt="logo"
        className="mb-12 h-44 w-auto mx-auto"
      />
      <p className="text-gray-300 mb-6">
        Don't have an account? Sign up now.
      </p>
      <Link
        to="/register"
        className="border-2 rounded-lg font-semibold border-white py-3 px-8 inline-block hover:bg-white hover:text-black transition"
      >
        SIGN UP
      </Link>
    </div>
  </motion.div>
</motion.div>

  )
};

export default Login;
