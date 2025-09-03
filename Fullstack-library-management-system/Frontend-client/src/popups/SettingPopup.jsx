import React, { useState } from "react";
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { updateUserCredentials } from "../store/slices/authSlice"; 

const SettingPopup = () => {
  const dispatch = useDispatch();
  const { settingPopup } = useSelector((state) => state.popup);
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!settingPopup) return null; // don’t render if closed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(updateUserCredentials({ email: formData.email, password: formData.password }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => dispatch(toggleSettingPopup())}
          className="absolute top-3 right-3 hover:scale-110 transition"
        >
          <img src={closeIcon} alt="Close" className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Update Credentials</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="New Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="16"
            className="w-full border rounded-lg p-2"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="16"
            className="w-full border rounded-lg p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save Credentials"}
          </button>
        </form>

        {/* Feedback */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm mt-3">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SettingPopup;
