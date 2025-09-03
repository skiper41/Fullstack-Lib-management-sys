import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAllPopup } from "../store/slices/popupSlice";
import { recordBorrowBook, resetBorrowState, fetchAllBorrowedBooks } from "../store/slices/borrowSlice";
import { fetchAllBooks } from "../store/slices/bookSlice"; // ⬅️ import your books fetcher

const RecordBookPopup = () => {
  const dispatch = useDispatch();
  const { selectedBook } = useSelector((state) => state.popup);
  const { loading, error, message } = useSelector((state) => state.borrow);

  const [email, setEmail] = useState("");

  if (!selectedBook) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(recordBorrowBook({ bookId: selectedBook._id, email }));
  };

  // ✅ After success/error
  useEffect(() => {
    if (message) {
      alert(`✅ ${message}`);
      dispatch(fetchAllBooks());             // ⬅️ refresh books quantity
      dispatch(fetchAllBorrowedBooks());  // ⬅️ refresh borrow records
      dispatch(closeAllPopup());
      dispatch(resetBorrowState());
    }
    if (error) {
      alert(`❌ ${error}`);
      dispatch(resetBorrowState());
    }
  }, [message, error, dispatch]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={() => dispatch(closeAllPopup())}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Borrow: {selectedBook.title}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Borrow"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordBookPopup;
