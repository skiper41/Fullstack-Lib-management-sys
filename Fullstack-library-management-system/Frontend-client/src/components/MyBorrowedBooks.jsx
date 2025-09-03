import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBorrowedBooks } from "../store/slices/borrowSlice";
import { BookA } from "lucide-react";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { myBorrowedBooks, loading, error } = useSelector(
    (state) => state.borrow
  );

  useEffect(() => {
    dispatch(fetchMyBorrowedBooks());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 pt-24 text-gray-500">Loading borrowed books...</div>;
  }

  if (error) {
    return <div className="p-6 pt-24 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 pt-24">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
        <BookA /> My Borrowed Books
      </h2>

      {myBorrowedBooks.length === 0 ? (
        <p className="text-gray-500">You haven’t borrowed any books yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBorrowedBooks.map((borrow) => (
            <div
              key={borrow._id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {borrow.book?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                by {borrow.book?.author}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Borrowed On:{" "}
                <span className="font-medium">
                  {new Date(borrow.borrowedAt).toLocaleDateString()}
                </span>
              </p>
              {borrow.returnedAt ? (
                <p className="text-sm text-green-600">
                  Returned On:{" "}
                  <span className="font-medium">
                    {new Date(borrow.returnedAt).toLocaleDateString()}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-red-600">Not yet returned</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBorrowedBooks;
