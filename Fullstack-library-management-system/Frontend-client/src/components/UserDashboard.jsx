import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// assets
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";

// thunks
import { fetchMyBorrowedBooks } from "../store/slices/borrowSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((s) => s.auth || {});
  const { borrowedBooks = [], loading } = useSelector((s) => s.borrow || {});

  // fetch only user’s borrowed books
  useEffect(() => {
    if (!currentUser?._id) return;
    dispatch(fetchMyBorrowedBooks(currentUser._id));
  }, [dispatch, currentUser]);

  const activeBorrows = useMemo(
    () => borrowedBooks.filter((b) => !b.returnDate).length,
    [borrowedBooks]
  );

  const overdueBorrows = useMemo(() => {
    const now = Date.now();
    return borrowedBooks.filter(
      (b) => !b.returnDate && b.dueDate && new Date(b.dueDate).getTime() < now
    ).length;
  }, [borrowedBooks]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const dueToday = useMemo(
    () =>
      borrowedBooks.filter(
        (b) =>
          !b.returnDate &&
          b.dueDate &&
          new Date(b.dueDate).toISOString().slice(0, 10) === todayStr
      ).length,
    [borrowedBooks, todayStr]
  );

  const totalFines = Number(currentUser?.finesDue) || 0;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 pb-3 py-10">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back{currentUser?.name ? `, ${currentUser.name}` : ""}!
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Last sync:{" "}
          <span className="font-medium">{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="w-full bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3">
          Loading your data…
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <img src={bookIcon} alt="Books" className="w-10 h-10" />
          <div>
            <p className="text-gray-500 text-sm">Active Borrows</p>
            <p className="text-xl font-semibold">{activeBorrows}</p>
            <p className="text-xs text-gray-400">{dueToday} due today</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-gray-500 text-sm">Overdue Books</p>
          <p className="text-xl font-semibold">{overdueBorrows}</p>
          <p className="text-xs text-gray-400">Past due date</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-gray-500 text-sm">My Fines</p>
          <p className="text-xl font-semibold">₹{totalFines}</p>
          <p className="text-xs text-gray-400">Payable balance</p>
        </div>
      </div>

      {/* Borrow List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          My Borrowed Books
        </h2>
        {borrowedBooks.length ? (
          <ul className="divide-y divide-gray-200">
            {borrowedBooks.map((b) => (
              <li key={b._id} className="py-2 flex justify-between">
                <span>{b.title}</span>
                <span className="text-sm text-gray-500">
                  {b.dueDate
                    ? `Due: ${new Date(b.dueDate).toLocaleDateString()}`
                    : "No due date"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No borrowed books yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
