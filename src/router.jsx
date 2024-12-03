import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/guest/homePage";
// import LoginPage from "./pages/guest/loginPage";
import { ROUTERS } from "./utils/router";
// import MasterLayout from "./layout/userLayout";
import AdminLayout from "./layout/adminLayout";
// import ProductPage from "./pages/guest/productPage";
// import DetailProduct from "./pages/guest/detailProduct";
// import CartPage from "./pages/guest/cartPage";
import DashBoard from "./pages/admin/dashBoard";
import ProductPage from "./pages/admin/productPage";
import OrderListPage from "./pages/admin/orderListPage";
// const renderGuestRouter = () => {
//   const guestRouters = [
//     {
//       path: ROUTERS.GUEST.HOME,
//       component: <HomePage />,
//     },
//     {
//       path: ROUTERS.GUEST.LOGIN, // Thêm đường dẫn cho LOGIN
//       component: <LoginPage />, // Thêm component cho LOGIN
//     },
//     {
//       path: ROUTERS.GUEST.IPHONE,
//       component: <ProductPage />,
//     },
//     {
//       path: ROUTERS.GUEST.CART,
//       component: <CartPage />,
//     },
//     {
//       path: ROUTERS.GUEST.PRODUCT_DETAIL(":productId"), // Đường dẫn chi tiết sản phẩm với tham số productId
//       component: <DetailProduct />,
//     },
//   ];
//   return (
//     <MasterLayout>
//       <Routes>
//         {guestRouters.map((item, key) => (
//           <Route key={key} path={item.path} element={item.component} />
//         ))}
//       </Routes>
//     </MasterLayout>
//   );
// };
const renderAdminRouter = () => {
  const adminRouters = [
    {
      path: ROUTERS.ADMIN.DASHBOARD,
      component: <DashBoard />,
    },
    {
      path: ROUTERS.ADMIN.MANAGE_PRODUCTS,
      component: <ProductPage />,
    },
    {
      // Thêm các route cho từng loại sản phẩm trong admin
      path: ROUTERS.ADMIN.MANAGE_PRODUCTS + "/:productType", // :productType sẽ thay đổi theo từng loại sản phẩm
      component: <ProductPage />, // Render ProductPage với loại sản phẩm tương ứng
    },
    {
      path: ROUTERS.ADMIN.ORDER,
      component: <OrderListPage />,
    },
  ];
  return (
    <AdminLayout>
      <Routes>
        {adminRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </AdminLayout>
  );
};

const RouterCustom = () => {
  return renderAdminRouter();
};

export default RouterCustom;
