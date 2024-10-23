import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/guest/homePage";
import LoginPage from "./pages/guest/loginPage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./component/theme/masterLayout";
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
