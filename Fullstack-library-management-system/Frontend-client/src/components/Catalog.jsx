import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSquareCheck } from "react-icons/fa6";
import { fetchAllBooks } from "../store/slices/bookSlice";

const Catalog = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 pt-24 text-gray-500">Loading catalog...</div>;
  }

  return (
    <div className="p-6 pt-24">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">📚 Catalog</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No books in catalog.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <p className="text-sm text-gray-700 mb-4">{book.description}</p>

              <div className="flex items-center gap-2 text-green-600 font-medium">
                <FaSquareCheck /> Available: {book.quantity}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
