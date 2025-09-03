import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = { name, email, password };
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      navigate(`/otp-verification/${email}`);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate, email]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      className="flex flex-col md:flex-row h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT SIDE (BLACK, Decorative) */}
      <motion.div
        className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-8 rounded-tr-[120px] rounded-br-[120px]"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logo_with_title}
          alt="logo"
          className="mb-10 h-36 w-auto"
        />
        <p className="text-gray-300 mb-6 text-center">
          Already have an account? Sign in now.
        </p>
        <Link
          to="/login"
          className="border-2 rounded-lg font-semibold border-white py-3 px-8 hover:bg-white hover:text-black transition"
        >
          SIGN IN
        </Link>
      </motion.div>

      {/* RIGHT SIDE (FORM) */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center bg-white p-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img src={logo} alt="logo" className="h-20 w-auto" />
            <h3 className="font-semibold text-3xl text-center">Sign Up</h3>
          </div>

          <p className="text-gray-700 text-center mb-6 text-sm">
            Provide your details to create a new account.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
