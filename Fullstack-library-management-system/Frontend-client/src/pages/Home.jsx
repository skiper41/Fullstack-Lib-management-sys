import React, { useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
      />

      {/* Right Side */}
      <div className="flex-1 flex flex-col md:ml-64">
        <Header toggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)} />

        <main className="flex-1 px-4 md:px-6 py-4">
          {(() => {
            switch (selectedComponent) {
              case "Dashboard":
                return user?.role === "member" ? (
                  <UserDashboard />
                ) : (
                  <AdminDashboard />
                );
              case "Books":
                return <BookManagement />;
              case "Catalog":
                return <Catalog />;
              case "Users":
                return user.role === "admin" ? <Users /> : null;
              case "My Borrowed Books":
                return <MyBorrowedBooks />;
              default:
                return user?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <UserDashboard />
                );

            }
          })()}
        </main>
      </div>
    </div>
  );
};

export default Home;
