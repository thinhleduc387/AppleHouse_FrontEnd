import { useRef, useState } from "react";
import { callLogout } from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutAction } from "../../redux/slice/accountSlice";
import { toast } from "react-toastify";
import { resetCart } from "../../redux/slice/cartSlice";

const ProfileNavBar = ({ userAvatar, userName }) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleLogOut = async () => {
    try {
      const response = await callLogout();
      if (response.status === 200 && response.metadata) {
        dispatch(setLogoutAction());
        dispatch(resetCart());
        navigate("/");
        toast.success("Logged out successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="relative">
      {isAuthenticated ? (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Profile Display */}
          <button
            ref={dropdownRef}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-300"
              src={userAvatar}
              alt="User Avatar"
            />
            <span className="text-sm font-semibold text-gray-700">
              {userName || "User"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
              style={{ animation: "fadeIn 0.2s ease-in-out" }}
            >
              <div className="py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150"
                >
                  Profile
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150"
                >
                  Admin Page
                </Link>
                <button
                  onClick={handleLogOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition duration-150 w-full text-left"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/login"}
          className="font-extrabold text-3xl my-7 lg:my-0 relative"
        >
          <AiOutlineUser />
        </Link>
      )}
    </div>
  );
};

export default ProfileNavBar;
