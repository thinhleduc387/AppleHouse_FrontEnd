import { useState, useEffect } from "react";
import { AiOutlineOrderedList, AiTwotoneNotification } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileSection from "./ProfileSection";
import { FaLocationDot } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { callLogout } from "../../config/api";
import { setLogoutAction } from "../../redux/slices/accountSlice";
import { RiLockPasswordLine } from "react-icons/ri";
import { clearRoleData } from "../../redux/slices/rbacSlice";
import { CiDiscount1 } from "react-icons/ci";
import { useTranslation } from "react-i18next"; // Thêm useTranslation

const Sidebar = () => {
  const { t } = useTranslation("profile"); // Sử dụng namespace profile
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const items = [
    {
      icon: AiOutlineOrderedList,
      text: t("myOrders"),
      path: "/profile/order-list",
    },
    {
      icon: AiTwotoneNotification,
      text: t("notifications"),
      path: "/profile/notifications",
    },
    {
      icon: RiLockPasswordLine,
      text: t("changePassword"),
      path: "/profile/change-password",
    },
    {
      icon: FaLocationDot,
      text: t("shippingAddress"),
      path: "/profile/address",
    },
    {
      icon: CiDiscount1,
      text: t("voucherStorage"),
      path: "/profile/voucher",
    },
    {
      icon: RiLogoutBoxLine,
      text: t("logout"),
      path: "/profile/order-list",
    },
  ];

  const userAvatar = useSelector((state) => state.account.user.avatar);
  const userName = useSelector((state) => state.account.user.name);
  const userEmail = useSelector((state) => state.account.user.email);

  const handleLogOut = async () => {
    try {
      const response = await callLogout();
      if (response.status === 200 && response.metadata) {
        dispatch(setLogoutAction());
        dispatch(clearRoleData());
        navigate("/login");
      } else {
        console.error("Logout failed", response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const active = items.find((item) => currentPath.startsWith(item.path));
    setActiveItem(active ? active.text : null);
  }, [location, items]);

  return (
    <div className="top-0 left-0 min-w-[250px] overflow-auto space-y-4 md:rounded-lg">
      <div className="bg-white dark:bg-gray-800 py-6 rounded-xl shadow-md">
        <ProfileSection
          userName={userName}
          userAvatar={userAvatar}
          userEmail={userEmail}
        />
      </div>

      <div className="relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl py-6 border border-gray-300 dark:border-gray-700">
        <ul className="space-y-3 flex-1">
          {items.map((item) => (
            <li key={item.text}>
              {item.text === t("logout") ? (
                <Link
                  to={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogOut();
                  }}
                  className={`text-sm flex items-center px-8 py-4 transition-all ease-in-out duration-300 ${
                    activeItem === item.text
                      ? "text-[#007bff] dark:text-blue-400 border-r-[5px] border-[#077bff] dark:border-blue-400 bg-gray-100 dark:bg-gray-700"
                      : "text-black dark:text-gray-100 hover:text-[#007bff] dark:hover:text-blue-400 hover:border-r-[5px] hover:border-[#077bff] dark:hover:border-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px] mr-4 text-black dark:text-gray-100" />
                  <span>{item.text}</span>
                </Link>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setActiveItem(item.text)}
                  className={`text-sm flex items-center px-8 py-4 transition-all ease-in-out duration-300 ${
                    activeItem === item.text
                      ? "text-[#007bff] dark:text-blue-400 border-r-[5px] border-[#077bff] dark:border-blue-400 bg-gray-100 dark:bg-gray-700"
                      : "text-black dark:text-gray-100 hover:text-[#007bff] dark:hover:text-blue-400 hover:border-r-[5px] hover:border-[#077bff] dark:hover:border-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px] mr-4 text-black dark:text-gray-100" />
                  <span>{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
