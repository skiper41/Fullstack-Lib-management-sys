import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  logout,
  resetAuthSlice,
} from "../store/slices/authSlice.js";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slices/popupSlice";
import AddNewAdmin from "../popups/AddNewAdmin.jsx";
import SettingPopup from "../popups/SettingPopup.jsx";
// icons
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup);
  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthSlice());
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, loading, message]);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  return (
    <>
      <aside
        className={`bg-black text-white fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out z-30
    ${isSideBarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
    md:translate-x-0 md:w-64`}
      >
        {/* Logo */}
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>

        {/* Menu */}
        <nav className="flex-1 px-6 space-y-2">
          <button
            onClick={() => setSelectedComponent("Dashboard")}
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
          >
            <img src={dashboardIcon} alt="dashboard" /> <span>Dashboard</span>
          </button>
          {isAdmin ? (
            <>
              <button
                onClick={() => setSelectedComponent("Books")}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
              >
                <img src={bookIcon} alt="books" /> <span>Books</span>
              </button>
              <button
                onClick={() => setSelectedComponent("Catalog")}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
              >
                <img src={catalogIcon} alt="catalog" /> <span>Catalog</span>
              </button>
              <button
                onClick={() => setSelectedComponent("Users")}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
              >
                <img src={usersIcon} alt="users" /> <span>Users</span>
              </button>
              <button
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
              >
                <RiAdminFill className="w-6 h-6" /> <span>Add New Admin</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedComponent("Catalog")}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
              >
                <img src={catalogIcon} alt="catalog" /> <span>Catalog</span>
              </button>
              <button
                onClick={() => setSelectedComponent("My Borrowed Books")}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
              >
                <img src={catalogIcon} alt="my-borrowed" /> <span>My Borrowed Books</span>
              </button>
            </>
          )}

         {/* Settings (Update Credentials) */}
{isAdmin && (
  <button
    onClick={() => dispatch(toggleSettingPopup())}
    className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:bg-gray-800"
  >
    <img src={settingIcon} alt="setting" />{" "}
    <span>Update Credentials</span>
  </button>
)}

        </nav>

        {/* Logout */}
        <div className="px-6 py-4">
          <button
            className="py-2 font-medium text-center bg-transparent rounded-md flex items-center justify-center space-x-5 mb-7 mx-auto w-fit hover:bg-gray-800"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="logout" /> <span>Log Out</span>
          </button>
        </div>

        {/* Close (mobile) */}
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden cursor-pointer"
        />
      </aside>

      {/* Popup */}
      {/* Popup */}
{isAdmin && addNewAdminPopup && <AddNewAdmin />}
{isAdmin && settingPopup && <SettingPopup />}

    </>
  );
};

export default SideBar;
