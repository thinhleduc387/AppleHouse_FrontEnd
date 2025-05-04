import { useState, React } from "react";
import { getOneOrderByTrackinNumber } from "../../../config/api";
import { toast } from "react-toastify";
import { formatDate, formatVND } from "../../../utils";
import {
  FaCheck,
  FaSpinner,
  FaTruck,
  FaBoxOpen,
  FaTimes,
} from "react-icons/fa";

// OrderDetails Component
const OrderDetails = ({ order }) => {
  // Define status configurations
  const statusConfig = {
    "Xác nhận đơn hàng": {
      icon: FaCheck,
      bgColor: "bg-green-100",
      borderColor: "border-green-600",
      textColor: "text-green-600",
    },
    "Đang xử lý": {
      icon: FaSpinner,
      bgColor: "bg-green-100",
      borderColor: "border-green-600",
      textColor: "text-green-600",
    },
    "Đang giao": {
      icon: FaTruck,
      bgColor: "bg-green-100",
      borderColor: "border-green-600",
      textColor: "text-green-600",
    },
    "Giao hàng thành công": {
      icon: FaBoxOpen,
      bgColor: "bg-green-100",
      borderColor: "border-green-600",
      textColor: "text-green-600",
    },
    "Đã hủy": {
      icon: FaTimes,
      bgColor: "bg-red-100",
      borderColor: "border-red-600",
      textColor: "text-red-600",
    },
  };

  // Generate activities for provided statuses
  const allStatuses = [
    "Xác nhận đơn hàng",
    "Đang xử lý",
    "Đang giao",
    "Giao hàng thành công",
  ];
  const statusMap = {
    pending: "Xác nhận đơn hàng",
    processing: "Đang xử lý",
    shipped: "Đang giao",
    delivered: "Giao hàng thành công",
    cancelled: "Đã hủy",
  };
  const currentStatus = statusMap[order.order_status] || "Đã hủy";
  const currentStatusIndex = allStatuses.indexOf(currentStatus);
  const isCancelled = currentStatus === "Đã hủy";

  // Generate activities for all statuses, marking active/inactive
  const activities = allStatuses.map((status, index) => {
    const isActive = isCancelled ? false : index <= currentStatusIndex;
    return {
      status,
      isActive,
    };
  });

  // Add "Đã hủy" if cancelled
  if (isCancelled) {
    activities.push({
      status: "Đã hủy",
      isActive: true,
    });
  }

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-8 p-6 md:p-10 rounded-xl">
      {/* Left Panel: Activity Timeline */}
      <section className="bg-white rounded-xl shadow-lg w-full md:w-[400px] flex flex-col p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          #{order.order_trackingNumber}
        </h1>
        <span className="text-sm font-semibold text-blue-600 bg-blue-100 rounded-full px-3 py-1 w-max">
          {currentStatus}
        </span>
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Tiến trình đơn hàng
          </h2>
          <div className="flex flex-col space-y-10 max-h-[600px] overflow-y-auto pr-2 relative">
            {activities.map((activity, index) => {
              const IconComponent = statusConfig[activity.status].icon;
              return (
                <div
                  key={index}
                  className="flex items-start relative min-h-[4rem]"
                >
                  {/* Đường nối dọc */}
                  {index < activities.length - 1 && (
                    <div
                      className={`absolute left-[1.4rem] top-12 w-1 h-14 ${
                        activity.isActive ? "bg-green-600" : "bg-gray-300"
                      } z-0`}
                    />
                  )}

                  {/* Vòng tròn và biểu tượng */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                      activity.isActive
                        ? `${statusConfig[activity.status].bgColor} ${
                            statusConfig[activity.status].borderColor
                          } ${statusConfig[activity.status].textColor}`
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    } z-10`}
                  >
                    <IconComponent />
                  </div>

                  {/* Nhãn trạng thái */}
                  <div className="ml-4 mt-4 flex flex-col">
                    <p
                      className={`text-base ${
                        activity.isActive
                          ? `font-semibold ${
                              statusConfig[activity.status].textColor
                            }`
                          : "text-gray-600"
                      }`}
                    >
                      {activity.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Right Panel: Order Details */}
      <section className="bg-white rounded-xl shadow-lg flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Thông tin đơn hàng
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium">Ngày đặt hàng:</span>{" "}
              {formatDate(order.createdAt)}
            </p>
            {order.order_note && (
              <p>
                <span className="font-medium">Ghi chú:</span> {order.order_note}
              </p>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sản phẩm</h2>
          <table className="w-full text-base text-gray-700 border-collapse rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-6 text-left font-bold text-gray-800">
                  Sản phẩm
                </th>
                <th className="p-6 text-center font-bold text-gray-800">
                  Số lượng
                </th>
                <th className="p-6 text-center font-bold text-gray-800">
                  Giá (VND)
                </th>
              </tr>
            </thead>
            <tbody>
              {order.order_products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-6 font-medium text-gray-700 w-3/5">
                    {product.name || `Sản phẩm ${index + 1}`}
                  </td>
                  <td className="p-6 text-center">{product.quantity || 1}</td>
                  <td className="p-6 text-center font-medium text-gray-700">
                    {formatVND(product.priceAfterDiscount || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Summary */}
        <div className="flex flex-col items-end text-sm text-gray-600 space-y-3 max-w-[350px] ml-auto">
          <div className="flex justify-between w-full">
            <span className="font-medium">Tổng giá trị sản phẩm</span>
            <span className="font-semibold text-gray-800">
              {formatVND(order.order_checkout.totalPrice)}
            </span>
          </div>
          {order.order_checkout.productDiscount > 0 && (
            <div className="flex justify-between w-full">
              <span className="font-medium">Giảm giá sản phẩm</span>
              <span className="font-semibold text-gray-800">
                -{formatVND(order.order_checkout.productDiscount)}
              </span>
            </div>
          )}
          {order.order_checkout.voucherDiscount > 0 && (
            <div className="flex justify-between w-full">
              <span className="font-medium">Giảm giá voucher</span>
              <span className="font-semibold text-gray-800">
                -{formatVND(order.order_checkout.voucherDiscount)}
              </span>
            </div>
          )}
          {order.order_checkout.accLoyalPoint > 0 && (
            <div className="flex justify-between w-full">
              <span className="font-medium">Giảm giá điểm</span>
              <span className="font-semibold text-gray-800">
                -{formatVND(order.order_checkout.accLoyalPoint)}
              </span>
            </div>
          )}
          <div className="flex justify-between w-full">
            <span className="font-medium">Phí vận chuyển</span>
            <span className="font-semibold text-gray-800">
              {formatVND(order.order_checkout.feeShip)}
            </span>
          </div>
          <div className="flex justify-between w-full font-bold text-gray-800 border-t border-gray-300 pt-3 text-lg">
            <span>Tổng cộng</span>
            <span className="text-blue-600">
              {formatVND(order.order_checkout.totalCheckOut)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

// OrderGuest Component
const OrderGuest = () => {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrderDetails(null);
    setLoading(true);

    try {
      const response = await getOneOrderByTrackinNumber({
        trackingNumber: orderCode,
      });
      if (response.status === 200) {
        setOrderDetails(response.metadata);
      } else {
        toast.error(response.message || "Không tìm thấy đơn hàng");
        setError(response.message || "Không tìm thấy đơn hàng");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      {!orderDetails ? (
        <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div>
              <h1 className="text-4xl font-bold text-center text-gray-800">
                Tra cứu đơn hàng
              </h1>
              <p className="mt-3 text-center text-sm text-gray-500">
                Nhập mã vận đơn để kiểm tra trạng thái đơn hàng của bạn
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <input
                  type="text"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  placeholder="Nhập mã vận đơn"
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                />
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !orderCode}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white ${
                    loading || !orderCode
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Đang tra cứu...
                    </span>
                  ) : (
                    "Tra cứu"
                  )}
                </button>
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <OrderDetails order={orderDetails} />
      )}
    </div>
  );
};

export default OrderGuest;
