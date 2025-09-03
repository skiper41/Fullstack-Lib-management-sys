import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header.jsx";
import { fetchAllUsers } from "../store/slices/userSlice.js";


console.log("🔥 Users.jsx file loaded");

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
console.log("👀 Redux State:", users, loading, error);

  useEffect(() => {
    console.log('dispatch fetchalluser')
      console.log("fetchAllUsers fn:", fetchAllUsers); // 👈 check if it's undefined
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="relative flex-1 min-h-screen">
      {/* Top Header */}
      <Header />

      {/* Main content under header */}
      <main className="p-6 pt-28">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>

        <div className="bg-white rounded-xl shadow p-4">
          {loading && <p className="text-gray-500">Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          {!loading && !error && Array.isArray(users) && users.length > 0 ? (
  <ul className="space-y-2">
    {users.map((u) => (
      <li key={u._id} className="border-b pb-1">
        <span className="font-medium">{u.name}</span> – {u.email} ({u.role})
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-600">No users found.</p>
)}
        </div>
      </main>
    </div>
  );
};

export default Users;
