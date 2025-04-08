import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getListFlashSale, toggleFlashSale } from "../../../config/api";
import { FaEdit } from "react-icons/fa"; // Import FaEdit icon
import Pagination from "../../../component/Pagiantion";
import { FcStatistics } from "react-icons/fc";
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

const ITEMS_PER_PAGE = 5;

const FlashSalePage = () => {
  const { t } = useTranslation("flashsale"); // Sử dụng hook useTranslation để lấy hàm t
  const [activeTab, setActiveTab] = useState(t("all")); // Khởi tạo với giá trị đã dịch
  const [dateRange, setDateRange] = useState([null, null]);
  const [flashSales, setFlashSales] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDateRange = (dateRange) => {
    if (!dateRange[0] || !dateRange[1]) return [null, null];

    const startDate = new Date(dateRange[0]);
    const utcStartDate = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0,
        0
      )
    );

    const endDate = new Date(dateRange[1]);
    const utcEndDate = new Date(
      Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        23,
        59,
        59,
        999
      )
    );

    return [utcStartDate.toISOString(), utcEndDate.toISOString()];
  };

  const handleToggleDisable = async (id) => {
    try {
      const response = await toggleFlashSale(id);
      console.log("🚀 ~ handleToggleDisable ~ response:", response);

      setFlashSales((prevSales) =>
        prevSales.map((sale) =>
          sale._id === id ? { ...sale, disable: !sale.disable } : sale
        )
      );
    } catch (error) {
      console.error("Error toggling flash sale disable state:", error);
    }
  };

  const formatTimeRange = (startTime, endTime) => {
    const formatTime = (time) => {
      const date = new Date(time);
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMinutes() + 1).padStart(2, "0");
      const year = date.getUTCFullYear();
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const start = formatTime(startTime);
    const end = formatTime(endTime);

    return `${start} - ${end}`;
  };

  const handleGetAllFlashSale = async () => {
    try {
      const formattedDateRange = formatDateRange(dateRange);

      const response = await getListFlashSale({
        eventType: "Flash sale",
        status: activeTab === t("all") ? null : activeTab, // Sử dụng giá trị đã dịch
        page: currentPage,
        dateRange: formattedDateRange,
        limit: ITEMS_PER_PAGE,
      });

      setFlashSales(response.metadata.promotions);
      setTotalPages(response.metadata.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching flash sales:", error);
    }
  };

  const handleStaticPage = (id) => {
    navigate(`/admin/event/statistic/${id}`);
  };

  useEffect(() => {
    handleGetAllFlashSale();
  }, [location, activeTab, currentPage, dateRange]); // Gộp useEffect lại

  const handleEditFlashSale = (id) => {
    navigate(`/admin/flash-sale/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{t("programList")}</h2>{" "}
          {/* Dịch "Danh sách chương trình" */}
          <Link
            to="/admin/flash-sale/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + {t("create")} {/* Dịch "Tạo" */}
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-4">
          {[t("all"), t("ongoing"), t("upcoming"), t("ended")].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Picker Section */}
        <div className="flex items-center mb-4 space-x-4">
          <label className="text-lg font-semibold">
            {t("timeSlot")}: {/* Dịch "Khung giờ" */}
          </label>
          <Flatpickr
            className="border-2 border-gray-300 rounded px-3 py-2 w-56"
            options={{
              mode: "range",
              dateFormat: "d-m-Y",
            }}
            value={dateRange}
            onChange={(selectedDates) => setDateRange(selectedDates)}
            placeholder={t("selectTimeSlot")}
          />
          <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            {t("filter")} {/* Dịch "Lọc" */}
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">
                {t("timeSlot")} {/* Dịch "Khung giờ" */}
              </th>
              <th className="text-left px-4 py-2 border-b">
                {t("product")} {/* Dịch "Sản phẩm" */}
              </th>
              <th className="text-left px-4 py-2 border-b">
                {t("status")} {/* Dịch "Trạng thái" */}
              </th>
              <th className="text-left px-4 py-2 border-b">
                {t("toggle")} {/* Dịch "Bật/Tắt" */}
              </th>
              <th className="text-left px-4 py-2 border-b">
                {t("action")} {/* Dịch "Hành động" */}
              </th>
            </tr>
          </thead>
          <tbody>
            {flashSales.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  {t("noData")} {/* Dịch "Chưa có dữ liệu" */}
                </td>
              </tr>
            ) : (
              flashSales.map((sale) => {
                const isEnded = sale.status === "Đã kết thúc"; // So sánh với giá trị đã dịch
                return (
                  <tr
                    key={sale._id}
                    className={`${
                      isEnded
                        ? "opacity-50 text-gray-500 bg-gray-200"
                        : "text-black"
                    }`}
                  >
                    <td className="px-4 py-2 border-b">
                      {formatTimeRange(sale.startTime, sale.endTime)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {sale.appliedProductLength}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className="px-2 py-1 rounded">{sale.status}</span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          sale.disable || isEnded
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-600 cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!isEnded) handleToggleDisable(sale._id);
                        }}
                      >
                        <div
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            sale.disable ? "translate-x-0" : "translate-x-6"
                          }`}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b flex gap-2">
                      <button
                        className={`text-blue-500 opacity-100 ${
                          isEnded ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={isEnded}
                        onClick={() => handleEditFlashSale(sale._id)}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleStaticPage(sale._id)}
                      >
                        <FcStatistics size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {flashSales.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default FlashSalePage;
