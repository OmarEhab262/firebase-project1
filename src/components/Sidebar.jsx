import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { logout } from "../firebase";
import {
  Menu,
  Home,
  List,
  BookOpen,
  Download,
  Headphones,
  Heart,
  Settings,
  LifeBuoy,
  LogOut,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const list = [
    { name: "Discover", path: "/", icon: <Home size={20} /> },
    { name: "Category", path: "/category", icon: <List size={20} /> },
    { name: "My Library", path: "/my-library", icon: <BookOpen size={20} /> },
    { name: "Download", path: "/download", icon: <Download size={20} /> },
    {
      name: "Audio Books",
      path: "/audio-books",
      icon: <Headphones size={20} />,
    },
    { name: "Favorite", path: "/favorite", icon: <Heart size={20} /> },
  ];
  const helpList = [
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Support", path: "/support", icon: <LifeBuoy size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    Navigate("/login");
  };

  return (
    <>
      <button
        className="md:hidden p-2 fixed top-4 right-4 bg-white shadow-md rounded-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        className={`h-screen md:w-[320px] md:fixed bg-white shadow-md overflow-y-auto transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 z-40`}
      >
        <div className="p-4 flex flex-col">
          <h2 className="text-xl font-bold">
            <span className="text-blue-500">Book</span>Base
          </h2>
        </div>

        <ul className="p-4 list-none">
          {user?.email === "orlgamal26@gmail.com" && (
            <li className="mb-2">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-2  px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:text-blue-500"
                  }`
                }
              >
                <Shield size={20} />
                Admin Panel
              </NavLink>
            </li>
          )}
          {list.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2  px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:text-blue-500"
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="w-[90%] h-[2px] bg-gray-300 mx-auto rounded-2xl"> </div>
        <ul className="p-4 list-none">
          {helpList.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2  px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:text-blue-500"
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
          <li className="mb-2 flex">
            <NavLink
              onClick={handleLogout}
              className={`flex items-center gap-2  px-4 py-2 rounded-md transition text-red-400`}
            >
              <LogOut size={20} />
              Sign Out
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
