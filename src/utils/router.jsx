import { FaTachometerAlt, FaBox, FaChartLine, FaStar, FaUser, FaMoneyBillWave, FaCogs, FaShoppingCart } from 'react-icons/fa';  // For commonly used icons
import { IoIosPaper, IoIosCart } from 'react-icons/io';  // For Pages and Orders

export const ROUTERS = {
  USER: {
    HOME: "",
    LOGIN: "/login",
    PRODUCTS: "/products", // Trang danh sách tất cả các sản phẩm
    PRODUCT_DETAIL: (productId = ":productId") => `/products/${productId}`, // Trang chi tiết sản phẩm
    CART: "/cart", // Giỏ hàng
    PROFILE: "/profile",
    ORDER_LIST: "/profile/order-list",
    FAVORITES: "/profile/favorites",
    ADDRESS: "/profile/address",
  },
  ADMIN: [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      links: [
        { name: "Thông kê doanh số", path: "/admin/sales-analytics" },
        { name: "Sellers List", path: "/admin/sellers-list" },
        { name: "Sellers Table", path: "/admin/sellers-table" },
        { name: "Sellers Grid", path: "/admin/sellers-grid" },
        { name: "Seller Profile", path: "/admin/seller-profile" },
        { name: "Revenue by Period", path: "/admin/revenue-by-period" },
      ],
    },
    {
      name: "Products",
      icon: <FaBox />,
      links: [
        { name: "Top Products", path: "/admin/top-products" },
        { name: "Products Grid", path: "/admin/products-grid" },
        { name: "Products Management", path: "/admin/products-management" },
        { name: "Product Editor", path: "/admin/product-editor" },
        { name: "Banners", path: "/admin/banners" },
        { name: "Add Product", path: "/admin/products/add" },
      ],
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      name: "Statistics",
      icon: <FaChartLine />,
      path: "/admin/statistics",
    },
    {
      name: "Reviews",
      icon: <FaStar />,
      path: "/admin/reviews",
    },
    {
      name: "Customers",
      icon: <FaUser />,
      path: "/admin/customers",
    },
    {
      name: "Transactions",
      icon: <FaMoneyBillWave />,
      path: "/admin/transactions",
      qty: 279,
    },
    {
      name: "Pages",
      icon: <IoIosPaper />,
      links: [
        { name: "Login", path: "/admin/login" },
        { name: "Page 404", path: "/admin/404" },
      ],
    },
    {
      name: "Settings",
      icon: <FaCogs />,
      links: [
        { name: "General Settings", path: "/admin/general-settings" },
        { name: "Connected Apps", path: "/admin/connected-apps" },
      ],
    },
  ],
};

export default ROUTERS;
