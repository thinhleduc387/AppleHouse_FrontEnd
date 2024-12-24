import React, { useEffect, useState } from "react";
import OrderTable from "../../../component/admin/order/OrderTable";
import { getAllOrder, getCountOrderStatus } from "../../../config/api";
import Loading from "../../../component/Loading";
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineTruck,
  HiOutlineXCircle,
  HiOutlineCheck,
} from "react-icons/hi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ITEMS_PER_PAGE = 8; // Số lượng đơn hàng mỗi trang

const OrderPage = () => {
  const [listOrder, setListOrder] = useState([]); // State cho danh sách đơn hàng
  const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
  const [statusCounts, setStatusCounts] = useState({
    confirmed: 0,
    processing: 0,
    shipped: 0,
    cancelled: 0,
    delivered: 0,
  }); // State đếm trạng thái đơn hàng
  console.log("🚀 ~ OrderPage ~ statusCounts:", statusCounts)
  const [currentPage, setCurrentPage] = useState(1); // State theo dõi trang hiện tại

  useEffect(() => {
    handleGetAllOrder();
    handleGetCountOrderStatus();
  }, []);

  const handleGetCountOrderStatus = async () => {
    try {
      const response = await getCountOrderStatus();
      console.log("🚀 ~ handleGetCountOrderStatus ~ response:", response);

      if (response && Array.isArray(response.metadata)) {
        // Chuyển dữ liệu API thành đối tượng `statusCounts`
        const counts = response.metadata.reduce(
          (acc, item) => {
            acc[item._id] = item.count; // Gán số lượng theo trạng thái
            return acc;
          },
          {
            confirmed: 0, // Mặc định nếu không có trong dữ liệu trả về
            processing: 0,
            shipped: 0,
            cancelled: 0,
            delivered: 0,
          }
        );

        setStatusCounts(counts); // Cập nhật state
      } else {
        console.error("Dữ liệu trạng thái không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy số lượng trạng thái đơn hàng:", error);
    }
  };

  const handleGetAllOrder = async () => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      const response = await getAllOrder();
      if (response && response.metadata) {
        setListOrder(response.metadata);
      } else {
        console.error("Không tìm thấy đơn hàng trong phản hồi.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  const StatusCard = ({ icon: Icon, label, count, color }) => (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4">
      <div className={`text-4xl ${color} mb-4`}>
        <Icon />
      </div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
      <div className="text-gray-800 text-2xl font-bold">{count}</div>
    </div>
  );

  // Hàm lấy dữ liệu theo từng trang
  const paginatedOrders = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return listOrder.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(listOrder.length / ITEMS_PER_PAGE); // Tổng số trang

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between bg-white px-6 py-8 rounded-lg items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-700">Quản lý đơn hàng</h1>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : (
        <>
          {/* Status Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <StatusCard
              icon={HiOutlineCheckCircle}
              label="Đã xác nhận"
              count={statusCounts.confirmed}
              color="text-green-500"
            />
            <StatusCard
              icon={HiOutlineClipboardList}
              label="Đang xử lý"
              count={statusCounts.processing}
              color="text-yellow-500"
            />
            <StatusCard
              icon={HiOutlineTruck}
              label="Đang giao hàng"
              count={statusCounts.shipped}
              color="text-blue-500"
            />
            <StatusCard
              icon={HiOutlineXCircle}
              label="Đã hủy"
              count={statusCounts.cancelled}
              color="text-red-500"
            />
            <StatusCard
              icon={HiOutlineCheck}
              label="Đã giao hàng"
              count={statusCounts.delivered}
              color="text-purple-500"
            />
          </div>

          {/* Orders Table */}
          <OrderTable
            listOrder={paginatedOrders()}
            setListOrder={setListOrder}
          />

          {/* Pagination */}
          <ul className="flex space-x-5 justify-center mt-6">
            {/* Previous Button */}
            <li
              className={`flex items-center justify-center bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              <AiOutlineLeft className="text-gray-500" />
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center w-9 h-9 rounded-md cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </li>
              )
            )}

            {/* Next Button */}
            <li
              className={`flex items-center justify-center bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            >
              <AiOutlineRight className="text-gray-500" />
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default OrderPage;
