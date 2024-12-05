import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../../component/Profile/SideBar";
import OrderHistory from "../../../component/Profile/OrderHistory";
import ProductSection from "../../../component/Product/ProductSection"

const ProfilePage = () => {
  return (
    <div>
    <div className="flex overflow-hidden">
      {/* ===== Sidebar Start ===== */}
      <div className="w-64 bg-gray-800 text-white h-fit z-10">
        <Sidebar />
      </div>
      {/* ===== Sidebar End ===== */}

      {/* ===== Content Area Start ===== */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* ===== Main Content Start ===== */}
        <main className="p-4 md:p-6 2xl:p-10">
          <Routes>
            <Route path="order-history" element={<OrderHistory />} />
            <Route index element={<OrderHistory />} />
          </Routes>
        </main>
        {/* ===== Main Content End ===== */}
      </div>
      {/* ===== Content Area End ===== */}
    </div>
    <div className="mt-4">
      <ProductSection/>
    </div>
    </div>
  );
};

export default ProfilePage;
