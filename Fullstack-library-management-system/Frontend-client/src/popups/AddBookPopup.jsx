import React, { useState } from "react";
import { useDispatch } from "react-redux";
import closeIcon from "../assets/close-square.png";
import { addBook } from "../store/slices/bookSlice";
import { toggleAddBookPopup } from "../store/slices/popupSlice";

const AddBookPopup = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(formData));
    setFormData({
      title: "",
      author: "",
      description: "",
      price: "",
      quantity: "",
    });
    dispatch(toggleAddBookPopup()); // close popup after submit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => dispatch(toggleAddBookPopup())}
          className="absolute top-3 right-3 hover:scale-110 transition"
        >
          <img src={closeIcon} alt="Close" className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 shadow"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPopup;
