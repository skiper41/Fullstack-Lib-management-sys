import React, { useState, useEffect } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { registerNewAdmin } from "../store/slices/userSlice";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [preview, setPreview] = useState(placeHolder);
  const [isOpen, setIsOpen] = useState(true); // local visibility state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", formData.avatar);

    dispatch(registerNewAdmin(data));
  };

  // 👇 Auto close when success
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1500); // closes popup after 1.5s
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (!isOpen) return null; // completely remove popup when closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative p-6">
        {/* Close button */}
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
        >
          <img src={closeIcon} alt="close" className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <img src={keyIcon} alt="key" className="h-6 w-6" />
          Add New Admin
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="avatar" className="cursor-pointer">
              <img
                src={preview}
                alt="avatar preview"
                className="h-24 w-24 object-cover rounded-full border"
              />
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">Upload Avatar</p>
          </div>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password (8–16 chars)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="16"
            className="w-full border rounded-lg p-2"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Registering..." : "Register Admin"}
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

export default AddNewAdmin;
