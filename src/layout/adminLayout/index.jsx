import { memo, useState, useEffect, useRef } from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Đo chiều cao Header
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    // Theo dõi thay đổi kích thước cửa sổ
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div ref={headerRef} className="sticky top-0 z-20 bg-white shadow-md">
          <Header setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <main className="p-4 md:p-8 2xl:p-10">
          <Outlet context={{ headerHeight }} />
        </main>
      </div>
    </div>
  );
};

export default memo(AdminLayout);
