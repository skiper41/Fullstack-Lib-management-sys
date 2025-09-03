import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// assets
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";

// charts
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

// thunks
import { fetchAllUsers } from "../store/slices/userSlice";
import { fetchAllBooks } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks } from "../store/slices/borrowSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // state
  const { users = [], loading: usersLoading } = useSelector((s) => s.user || {});
  const { books = [], loading: booksLoading } = useSelector((s) => s.book || {});
  const { allBorrowedBooks = [], loading: borrowLoading } = useSelector(
    (s) => s.borrow || {}
  );
  const { user: currentUser } = useSelector((s) => s.auth || {});

  // fetch data
  useEffect(() => {
  if (!currentUser || !currentUser.role) return; // 🚫 no auth, stop early

  if (currentUser.role === "admin") {
    dispatch(fetchAllUsers());
    dispatch(fetchAllBooks());
    dispatch(fetchAllBorrowedBooks());
  }
}, [dispatch, currentUser]);


  // derived metrics
  const totalUsers = users.length;
  const adminCount = useMemo(
    () => users.filter((u) => (u.role || "").toLowerCase() === "admin").length,
    [users]
  );
  const memberCount = Math.max(totalUsers - adminCount, 0);

  const totalTitles = books.length;
  const totalStock = useMemo(
    () => books.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0),
    [books]
  );

  const activeBorrows = useMemo(
    () => allBorrowedBooks.filter((r) => !r.returnDate).length,
    [allBorrowedBooks]
  );

  const now = Date.now();
  const overdueBorrows = useMemo(
    () =>
      allBorrowedBooks.filter(
        (r) => !r.returnDate && r.dueDate && new Date(r.dueDate).getTime() < now
      ).length,
    [allBorrowedBooks, now]
  );

  const todayStr = new Date().toISOString().slice(0, 10);
  const dueToday = useMemo(
    () =>
      allBorrowedBooks.filter((r) => {
        if (!r.dueDate || r.returnDate) return false;
        return new Date(r.dueDate).toISOString().slice(0, 10) === todayStr;
      }).length,
    [allBorrowedBooks, todayStr]
  );

  const totalFines = useMemo(
    () => users.reduce((sum, u) => sum + (Number(u.finesDue) || 0), 0),
    [users]
  );

  // charts
  const rolesPie = {
    labels: ["Admins", "Members"],
    datasets: [
      {
        data: [adminCount, memberCount],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const bookTitleMap = useMemo(
    () => new Map(books.map((b) => [String(b._id), b.title])),
    [books]
  );

  const topBorrowCounts = useMemo(() => {
    const counts = new Map();
    for (const r of allBorrowedBooks) {
      const key = String(r.book);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([id, count]) => ({
        id,
        count,
        title: bookTitleMap.get(id) || "Unknown Title",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [allBorrowedBooks, bookTitleMap]);

  const topBarData = {
    labels: topBorrowCounts.map((x) => x.title),
    datasets: [
      {
        label: "Borrows",
        data: topBorrowCounts.map((x) => x.count),
        backgroundColor: "#6366f1",
        borderRadius: 8,
      },
    ],
  };

  const borrowTrend = useMemo(() => {
    const dayCounts = new Map();
    for (const r of allBorrowedBooks) {
      let dt = r.createdAt ? new Date(r.createdAt) : null;
      if (!dt && r.dueDate) {
        dt = new Date(new Date(r.dueDate).getTime() - 7 * 24 * 60 * 60 * 1000);
      }
      if (!dt || Number.isNaN(+dt)) continue;
      const key = dt.toISOString().slice(0, 10);
      dayCounts.set(key, (dayCounts.get(key) || 0) + 1);
    }
    const labels = [...dayCounts.keys()].sort();
    const values = labels.map((k) => dayCounts.get(k));
    return { labels, values };
  }, [allBorrowedBooks]);

  const trendLineData = {
    labels: borrowTrend.labels,
    datasets: [
      {
        label: "Borrows per day",
        data: borrowTrend.values,
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.2)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const anyLoading = usersLoading || booksLoading || borrowLoading;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between  top-8 bg-gray-50 pb-3 z-20 py-10">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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

      {/* Loading banner */}
      {anyLoading && (
        <div className="w-full bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3">
          Syncing live data…
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <img src={usersIcon} alt="Users" className="w-10 h-10" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-xl font-semibold">{totalUsers}</p>
            <p className="text-xs text-gray-400">
              {adminCount} Admin · {memberCount} Member
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <img src={adminIcon} alt="Admins" className="w-10 h-10" />
          <div>
            <p className="text-gray-500 text-sm">Admins</p>
            <p className="text-xl font-semibold">{adminCount}</p>
            <p className="text-xs text-gray-400">Team size</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <img src={bookIcon} alt="Books" className="w-10 h-10" />
          <div>
            <p className="text-gray-500 text-sm">Book Titles</p>
            <p className="text-xl font-semibold">{totalTitles}</p>
            <p className="text-xs text-gray-400">In catalog</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-gray-500 text-sm">Total Stock</p>
          <p className="text-xl font-semibold">{totalStock}</p>
          <p className="text-xs text-gray-400">Available copies</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-gray-500 text-sm">Active Borrows</p>
          <p className="text-xl font-semibold">{activeBorrows}</p>
          <p className="text-xs text-gray-400">Not returned</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-gray-500 text-sm">Overdue</p>
          <p className="text-xl font-semibold">{overdueBorrows}</p>
          <p className="text-xs text-gray-400">{dueToday} due today</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
            <span className="text-xs text-gray-400">Pie</span>
          </div>
          <div className="h-[240px]">
            <Pie
              data={rolesPie}
              options={{
                plugins: { legend: { position: "bottom" } },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Borrowed Titles
            </h2>
            <span className="text-xs text-gray-400">Bar</span>
          </div>
          <div className="h-[240px]">
            {topBorrowCounts.length ? (
              <Bar
                data={topBarData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { maxRotation: 0, minRotation: 0 } },
                    y: { beginAtZero: true, precision: 0 },
                  },
                  maintainAspectRatio: false,
                }}
              />
            ) : (
              <p className="text-sm text-gray-500">No borrow data yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Borrow Trend</h2>
            <span className="text-xs text-gray-400">Line</span>
          </div>
          <div className="h-[240px]">
            {borrowTrend.labels.length ? (
              <Line
                data={trendLineData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, precision: 0 },
                  },
                  maintainAspectRatio: false,
                }}
              />
            ) : (
              <p className="text-sm text-gray-500">No trend data yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Fines Overview
          </h2>
          <p className="text-2xl font-bold">
            ₹{totalFines.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total fines due across users
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl shadow p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Quick Tips</h2>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Use Catalog to record borrows/returns.</li>
            <li>Users page to review verified accounts.</li>
            <li>Books page to add/remove titles.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin</h2>
          <p className="text-sm text-gray-600">
            You are logged in as{" "}
            <span className="font-medium">{currentUser?.email}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Role: {(currentUser?.role || "").toUpperCase() || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
