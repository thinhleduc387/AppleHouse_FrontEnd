import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAccount } from "./redux/slice/accountSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Layouts
import MasterLayout from "./layout/userLayout";
import AdminLayout from "./layout/adminLayout";

// Pages
import HomePage from "./pages/user/homePage";
import LoginPage from "./pages/user/loginPage";
import ProductPage from "./pages/user/productPage";
import DetailProduct from "./pages/user/detailProduct";
import CartPage from "./pages/user/cartPage";
import ProfilePage from "./pages/user/profilePage";

// Admin Pages (commented out, can be added later)
import DashBoard from "./pages/admin/dashBoard";
import OrderListPage from "./pages/admin/orderListPage";
import ProductPageAdmin from "./pages/admin/productPage";

import { ROUTERS } from "./utils/router";

const RouterCustom = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]); // Add dependency to only run once

  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<MasterLayout />}>
          <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
          <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
          <Route path={ROUTERS.USER.IPHONE} element={<ProductPage />} />
          <Route path={ROUTERS.USER.CART} element={<CartPage />} />
          <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
          <Route
            path={ROUTERS.USER.PRODUCT_DETAIL(":productId")}
            element={<DetailProduct />}
          />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path={ROUTERS.ADMIN.DASHBOARD} element={<DashBoard />} />
          <Route
            path={ROUTERS.ADMIN.MANAGE_PRODUCTS}
            element={<ProductPageAdmin />}
          />
          <Route path={ROUTERS.ADMIN.ORDER} element={<OrderListPage />} />
          <Route
            path={ROUTERS.ADMIN.MANAGE_PRODUCTS + "/:productType"}
            element={<ProductPageAdmin />}
          />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer
        position="top-right" // Vị trí toàn cục cho tất cả thông báo
        autoClose={1000} // Thời gian đóng tự động mặc định
        hideProgressBar={false} // Hiển thị thanh tiến trình
        newestOnTop={false} // Để các thông báo mới ở dưới
        closeButton={true} // Hiển thị nút đóng
        pauseOnHover={true} // Dừng khi hover
        draggable={true} // Cho phép kéo
        rtl={false} // Tắt hiển thị RTL
      />
    </>
  );
};

export default RouterCustom;
