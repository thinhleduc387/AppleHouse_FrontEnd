import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/guest/homePage";
import LoginPage from "./pages/guest/loginPage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./component/theme/masterLayout";
import ProductPage from "./pages/guest/productPage";
import DetailProduct from "./pages/guest/detailProduct";
const renderGuestRouter = () => {
  const guestRouters = [
    {
      path: ROUTERS.GUEST.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.GUEST.LOGIN, // Thêm đường dẫn cho LOGIN
      component: <LoginPage />, // Thêm component cho LOGIN
    },
    {
      path: ROUTERS.GUEST.IPHONE,
      component: <ProductPage />,
    },
    {
      path: ROUTERS.GUEST.PRODUCT_DETAIL(":productId"), // Đường dẫn chi tiết sản phẩm với tham số productId
      component: <DetailProduct />,
    },
  ];
  return (
    <MasterLayout>
      <Routes>
        {guestRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderGuestRouter();
};

export default RouterCustom;
