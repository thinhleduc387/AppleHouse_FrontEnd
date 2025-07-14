import { memo, useState, useEffect, useRef } from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
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
        <main className="flex-1 p-4 md:p-8 2xl:p-10">
          <div className="h-full">
            <Outlet
              context={{
                headerHeight,
                mainPadding: { sm: 16, md: 32, "2xl": 40 },
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default memo(AdminLayout);
