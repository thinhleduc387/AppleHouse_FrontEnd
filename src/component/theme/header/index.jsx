import { useState, useEffect, useRef } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import SideBar from "./component/SideBar";
import Search from "../../SearchBox";
import { AiOutlineHeart, AiOutlineSetting } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PiBellSimpleRinging } from "react-icons/pi";
import ProfileNavBar from "../../../component/ProfileNav";
import DropdownMenu from "./component/DropdownMenu";
import { Link } from "react-router-dom";
import NotificationMenu from "../../Notification/notificationMenu";
import { fetchCart } from "../../../redux/slices/cartSlice";
import socket, { registerUser } from "../../../socket";
import { getListNotification } from "../../../config/api";
import { useTranslation } from "react-i18next";
import Settings from "../../Settings"; // Thêm import Settings
import { motion, AnimatePresence } from "framer-motion"; // Thêm Framer Motion

const Header = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const Links = [
    { name: "About", link: "/" },
    { name: "Contact", link: "/profile" },
  ];

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const userAvatar = useSelector((state) => state.account.user.avatar);
  const userName = useSelector((state) => state.account.user.name);
  const userId = useSelector((state) => state.account.user._id);
  const cart_products = useSelector((state) => state.cart.cart_products);
  const localCartItems = useSelector((state) => state.cart.localCartItems);

  const [notifications, setNotifications] = useState([]);
  const unReadNotifications = notifications.filter(
    (value) => value.isRead === false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false); // Thêm state cho Settings
  const headerRef = useRef(null);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(false);
    }
  };

  const handleGetListNotification = async () => {
    try {
      const response = await getListNotification({ userId });
      if (response && response?.metadata && response?.metadata.length > 0) {
        setNotifications(response?.metadata);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetListNotification();
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    window.addEventListener("resize", handleResize);

    if (userId) {
      dispatch(fetchCart(userId));
      registerUser(userId);
    }

    socket.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    socket.on("notification_updated", (updatedNotification) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === updatedNotification._id ? updatedNotification : notif
        )
      );
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error.message);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [userId, dispatch]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const markAsRead = (notificationId) => {
    socket.emit("mark_as_read", { notificationId });
  };

  return (
    <>
      <div className="w-full top-0 left-0 z-10 sticky shadow-md dark:bg-gray-800">
        <div
          className="py-4 px-4 sm:px-6 md:px-12 lg:px-16 lg:flex justify-between items-center bg-[#f3f4f6] dark:bg-gray-900 relative"
          ref={headerRef}
        >
          <div className="flex items-center justify-between w-full lg:w-auto">
            <a href="/" className="font-bold text-3xl dark:text-white">
              AppleHouse
            </a>
            <div className="hidden lg:block">
              <DropdownMenu headerHeight={headerHeight} />
            </div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-7 h-7 lg:hidden cursor-pointer dark:text-white"
            >
              <Bars3BottomRightIcon />
            </div>
          </div>

          <div className="mt-4 lg:hidden">
            <Search />
          </div>

          <Search className="hidden lg:flex lg:ml-10" />

          <ul className="hidden lg:flex pl-9 lg:pl-0 justify-end items-center space-x-8 ml-4">
            <li className="font-extrabold text-3xl my-7 lg:my-0 relative dark:text-white">
              <Link to="/order-guest" title="Tra cứu đơn hàng">
                <FaTruck />
              </Link>
            </li>
            <li className="font-extrabold text-3xl my-7 lg:my-0 relative dark:text-white">
              <Link to="/cart">
                <IoCartOutline />
                {(cart_products.length > 0 || localCartItems.length > 0) && (
                  <span className="absolute top-0 right-0 text-[0.6rem] bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cart_products.length + localCartItems.length}
                  </span>
                )}
              </Link>
            </li>
            {isAuthenticated && (
              <li
                onMouseEnter={() => setNotifyIsOpen(true)}
                onMouseLeave={() => setNotifyIsOpen(false)}
                className="my-7 lg:my-0 relative"
              >
                <PiBellSimpleRinging className="cursor-pointer font-extrabold text-3xl" />
                {unReadNotifications?.length > 0 && (
                  <span className="absolute top-0 right-0 text-[0.6rem] bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {unReadNotifications?.length}
                  </span>
                )}
                {notifyIsOpen && (
                  <NotificationMenu
                    notifications={notifications}
                    markAsRead={markAsRead}
                  />
                )}
              </li>
            )}
            <li
              onMouseEnter={() => setSettingsIsOpen(true)}
              onMouseLeave={() => setSettingsIsOpen(false)}
              className="my-7 lg:my-0 relative"
            >
              <AiOutlineSetting className="cursor-pointer font-extrabold text-3xl dark:text-white" />
              <AnimatePresence>
                {settingsIsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-2"
                  >
                    <Settings />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li className="my-7 lg:my-0">
              <ProfileNavBar userAvatar={userAvatar} userName={userName} />
            </li>
          </ul>
        </div>
      </div>
      {isOpen && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;
