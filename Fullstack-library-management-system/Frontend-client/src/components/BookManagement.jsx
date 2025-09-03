import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookA, NotebookPen, Trash2, Eye, Hand, Undo2 } from "lucide-react";
import { fetchAllBooks, addBook, deleteBook } from "../store/slices/bookSlice";
import {
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
} from "../store/slices/popupSlice";

// Import Popups
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";
import ReturnBookPopup from "../popups/ReturnBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { readBookPopup, recordBookPopup, returnBookPopup } = useSelector(
    (state) => state.popup
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

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
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  if (loading) return <p className="text-center p-4">Loading books...</p>;

  return (
    <div className="p-6 pt-24">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
        <BookA className="text-blue-600" /> Book Management
      </h2>

      {/* Add Book Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 bg-white p-6 rounded-2xl shadow-md border"
      >
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
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
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
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 shadow"
        >
          <NotebookPen size={18} /> Add Book
        </button>
      </form>

      {/* Book List */}
      {books.length === 0 ? (
        <p className="text-gray-500 italic text-center">No books found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <li
              key={book._id}
              className="border rounded-2xl p-5 shadow-md hover:shadow-xl transition bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">By {book.author}</p>
                <p className="mt-3 text-gray-700 line-clamp-3">
                  {book.description}
                </p>
                <p className="mt-3 font-bold text-gray-900">₹{book.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {book.quantity}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => dispatch(toggleReadBookPopup(book))}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-indigo-600 transition"
                >
                  <Eye size={16} /> Read
                </button>
                <button
                  onClick={() => dispatch(toggleRecordBookPopup(book))}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-600 transition"
                >
                  <Hand size={16} /> Borrow
                </button>
                <button
                  onClick={() => dispatch(toggleReturnBookPopup(book))}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-yellow-600 transition"
                >
                  <Undo2 size={16} /> Return
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Popups */}
      {readBookPopup && <ReadBookPopup />}
      {recordBookPopup && <RecordBookPopup />}
      {returnBookPopup && <ReturnBookPopup />}
    </div>
  );
};

export default BookManagement;
