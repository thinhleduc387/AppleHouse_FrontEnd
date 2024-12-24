import { memo } from "react";
import Header from "../../component/theme/header";
import Footer from "../../component/theme/footer";
import { Outlet } from "react-router-dom";

const MasterLayout = ({ ...props }) => {
  return (
    <>
      <div
        className="flex flex-col min-h-screen mx-4 sm:mx-6 md:mx-12 lg:mx-28" // Điều chỉnh margin cho các màn hình khác nhau
        {...props}
      >
        <Header />

        <main className="flex-grow overflow-y-auto z-8">
          <Outlet />
        </main>
      </div>

      <div className="mt-8">
        {" "}
        {/* Điều chỉnh khoảng cách với footer */}
        <Footer />
      </div>
    </>
  );
};

export default memo(MasterLayout);
