import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", year: "numeric" };
      setDate(`${now.getDate()} ${now.toLocaleDateString("en-US", options)}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 h-16 bg-white shadow 
        flex items-center justify-between px-4 md:px-6 
        transition-all duration-300 
        md:pl-64   /* push content only on desktop */
      `}
    >
      {/* Hamburger only on mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-gray-100 rounded"
      >
        ☰
      </button>

      {/* Right side info */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Time + Date stacked */}
        <div className="flex flex-col items-center text-sm text-gray-600">
          <span>{time}</span>
          <div className="w-8 border-t border-gray-400 my-1"></div>
          <span>{date}</span>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border">
          {user?.avatar ? (
            <img
              src={user.avatar.url}
              alt={user.name || "Admin"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center h-full text-gray-600 font-semibold">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
